import { describe, expect, it } from 'vitest';
import { compileRule } from './compileRule';

const simple = (pattern: string) =>
  compileRule({ matchType: 'simple', pattern });

describe('simple patterns', () => {
  it.each([
    ['facebook.com', 'https://www.facebook.com/'],
    ['facebook.com', 'https://facebook.com/'],
    ['facebook.com', 'http://facebook.com/?ref=x'],
    ['facebook.com', 'https://facebook.com/#top'],
    ['www.facebook.com', 'https://facebook.com/'],
    ['FaceBook.com', 'https://facebook.com/'],
    ['facebook.com/', 'https://www.facebook.com/'],
    ['facebook.com/*', 'https://www.facebook.com/'],
    ['facebook.com/*', 'https://www.facebook.com/messages/t/1'],
    ['*.google.com/*', 'https://google.com/x'],
    ['*.google.com/*', 'https://mail.google.com/x'],
    ['*.google.com/*', 'https://a.b.google.com/x'],
    ['google.*', 'https://google.pl/'],
    ['github.com/bibixx/*', 'https://github.com/bibixx/tab-pinner'],
    ['github.com/bibixx', 'https://github.com/bibixx'],
    ['github.com/bibixx', 'https://github.com/bibixx/'],
    ['github.com/bibixx/', 'https://github.com/bibixx'],
    ['github.com/BIBIXX', 'https://github.com/bibixx'],
    ['localhost:3000/*', 'http://localhost:3000/app'],
    ['https://example.com', 'https://example.com/'],
    ['https://www.facebook.com/', 'https://facebook.com/'],
    ['https://www.facebook.com/messages', 'https://www.facebook.com/messages'],
    ['http://example.com/*', 'http://example.com/a'],
    ['Example.com/Blog', 'https://example.com/blog'],
    ['example.com/search', 'https://example.com/search?q=1#top'],
    ['chrome://extensions', 'chrome://extensions/'],
    ['*://example.com', 'ftp://example.com/'],
    ['example.com/a?b=1', 'https://example.com/a?b=1'],
    ['example.com/a?b=*', 'https://example.com/a?b=2&c=3'],
    ['example.com/a#x', 'https://example.com/a#x'],
    ['example.com/c++/*', 'https://example.com/c++/x'],
    ['example.com/(foo)', 'https://example.com/(foo)'],
    ['example.com/:user', 'https://example.com/:user'],
    ['example.com/zażółć', 'https://example.com/za%C5%BC%C3%B3%C5%82%C4%87'],
    ['zażółć.pl', 'https://xn--za-6ja4f8n1l.pl/'],
    ['  facebook.com  ', 'https://facebook.com/'],
  ])('%s matches %s', (pattern, url) => {
    expect(simple(pattern)?.(url)).toBe(true);
  });

  it.each([
    ['facebook.com', 'https://www.facebook.com/messages'],
    ['facebook.com', 'https://m.facebook.com/'],
    ['facebook.com', 'https://notfacebook.com/'],
    ['facebook.com', 'chrome://facebook.com/'],
    ['facebook.com/*', 'https://m.facebook.com/messages'],
    ['*.google.com/*', 'https://google.co.uk/'],
    ['github.com/bibixx/*', 'https://github.com/other'],
    ['github.com/bibixx', 'https://github.com/bibixx/tab-pinner'],
    ['localhost:3000/*', 'http://localhost:8080/app'],
    ['localhost/*', 'http://localhost:3000/app'],
    ['https://example.com', 'http://example.com/'],
    ['https://www.facebook.com/', 'http://facebook.com/'],
    ['example.com/a?b=1', 'https://example.com/a?b=2'],
    ['example.com/a?b=1', 'https://example.com/a'],
    ['example.com/a#x', 'https://example.com/a#y'],
    ['example.com', 'not a url'],
  ])('%s does not match %s', (pattern, url) => {
    expect(simple(pattern)?.(url)).toBe(false);
  });

  it.each([
    [''],
    ['   '],
    ['face book.com'],
    ['!facebook.com'],
    ['/only/a/path'],
    ['https://'],
    ['1bad://example.com'],
    ['user@example.com'],
    ['example.com:port'],
  ])('rejects %j', (pattern) => {
    expect(simple(pattern)).toBeNull();
  });
});

describe('regexp rules', () => {
  const regexp = (pattern: string) =>
    compileRule({ matchType: 'regexp', pattern });

  it('tests the whole URL', () => {
    const matches = regexp('^https?://www\\.facebook\\.com/?$');

    expect(matches?.('https://www.facebook.com/')).toBe(true);
    expect(matches?.('https://www.facebook.com/messages')).toBe(false);
  });

  it('stays case-sensitive', () => {
    expect(regexp('FACEBOOK')?.('https://facebook.com/')).toBe(false);
  });

  it('returns null for an invalid expression', () => {
    expect(regexp('(')).toBeNull();
  });

  it('returns null for an empty expression', () => {
    expect(regexp('')).toBeNull();
  });
});
