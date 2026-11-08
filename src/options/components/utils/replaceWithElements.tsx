import { Fragment, ReactNode } from 'react';

interface Match {
  match: string;
}

export const replaceWithElements = (
  string: string,
  regexp: RegExp,
  substitutions: ReactNode[],
) => {
  const matches = string.matchAll(regexp);
  const strings: (Match | string)[] = [];
  let lastEnd = 0;

  for (const match of matches) {
    if (match.index === undefined) {
      continue;
    }

    strings.push(string.substring(lastEnd, match.index));

    strings.push({ match: match[0] });

    lastEnd = match.index + match[0].length;
  }

  strings.push(string.substring(lastEnd));

  let matchesIndex = 0;

  return (
    <>
      {strings.map((el, i) => {
        if (typeof el === 'string') {
          return <Fragment key={el + i}>{el}</Fragment>;
        }

        return (
          <Fragment key={el.match + i}>
            {substitutions[matchesIndex++]}
          </Fragment>
        );
      })}
    </>
  );
};
