import { isMatch } from 'matcher';
import { PinnerRule } from '../../types/PinnerRule';

export type RuleMatcher = (url: string) => boolean;

interface SimplePattern {
  schemes: string[];
  hosts: string[];
  port: string;
  paths: string[];
  query: string | null;
  hash: string | null;
}

const DEFAULT_SCHEMES = ['http', 'https'];
const SCHEME_REGEXP = /^([a-z*][a-z0-9+.*-]*):\/\/(.*)$/i;
const AUTHORITY_REGEXP = /^([^\s!@:/\\]+)(?::(\d+|\*))?$/;

const takeFrom = (
  value: string,
  separator: string,
): [string, string | null] => {
  const index = value.indexOf(separator);

  return index === -1
    ? [value, null]
    : [value.slice(0, index), value.slice(index)];
};

const canonicalizeHost = (host: string): string => {
  // Wildcards aren't valid URL characters, so only literal hosts can be
  // normalized (for example to punycode).
  return host.includes('*') ? host : new URL(`http://${host}`).hostname;
};

const getHostGlobs = (host: string): string[] => {
  if (host.startsWith('*.')) {
    return [host.slice(2), host];
  }

  const bareHost = host.replace(/^www\./i, '');

  return [bareHost, `www.${bareHost}`];
};

const getPathGlobs = (path: string): string[] => {
  if (path === '/' || path.endsWith('*')) {
    return [path];
  }

  const withoutSlash = path.replace(/\/$/, '');

  return [withoutSlash, `${withoutSlash}/`];
};

const parseSimplePattern = (pattern: string): SimplePattern | null => {
  if (/\s/.test(pattern)) {
    return null;
  }

  const schemeMatch = SCHEME_REGEXP.exec(pattern);

  if (schemeMatch === null && pattern.includes('://')) {
    return null;
  }

  const rest = schemeMatch?.[2] ?? pattern;
  const authorityEnd = rest.search(/[/?#]/);
  const authority = authorityEnd === -1 ? rest : rest.slice(0, authorityEnd);
  const location = authorityEnd === -1 ? '' : rest.slice(authorityEnd);
  const authorityMatch = AUTHORITY_REGEXP.exec(authority);

  if (authorityMatch === null) {
    return null;
  }

  const [beforeHash, hash] = takeFrom(location, '#');
  const [path, query] = takeFrom(beforeHash, '?');

  try {
    return {
      schemes: schemeMatch === null ? DEFAULT_SCHEMES : [schemeMatch[1]],
      hosts: getHostGlobs(canonicalizeHost(authorityMatch[1])),
      port: authorityMatch[2] ?? '',
      paths: getPathGlobs(path === '' ? '/' : path),
      query,
      hash,
    };
  } catch {
    return null;
  }
};

const safeDecode = (value: string): string => {
  try {
    return decodeURI(value);
  } catch {
    return value;
  }
};

const compileSimple = (pattern: string): RuleMatcher | null => {
  const parsed = parseSimplePattern(pattern);

  if (parsed === null) {
    return null;
  }

  return (rawUrl) => {
    if (!URL.canParse(rawUrl)) {
      return false;
    }

    const url = new URL(rawUrl);

    return (
      isMatch(url.protocol.slice(0, -1), parsed.schemes) &&
      isMatch(url.hostname, parsed.hosts) &&
      (parsed.port === '' ? url.port === '' : isMatch(url.port, parsed.port)) &&
      isMatch([url.pathname, safeDecode(url.pathname)], parsed.paths) &&
      (parsed.query === null || isMatch(url.search, parsed.query)) &&
      (parsed.hash === null || isMatch(url.hash, parsed.hash))
    );
  };
};

const compileRegexp = (pattern: string): RuleMatcher | null => {
  try {
    const expression = new RegExp(pattern);

    return (url) => expression.test(url);
  } catch {
    return null;
  }
};

export const compileRule = ({
  matchType,
  pattern,
}: Pick<PinnerRule, 'matchType' | 'pattern'>): RuleMatcher | null => {
  const trimmedPattern = pattern.trim();

  if (trimmedPattern === '') {
    return null;
  }

  return matchType === 'regexp'
    ? compileRegexp(pattern)
    : compileSimple(trimmedPattern);
};
