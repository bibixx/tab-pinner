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
  const strings: (Match|string)[] = [];
  let lastEnd = 0;

  for (const match of matches) {
    if (match.index === undefined) {
      // eslint-disable-next-line no-continue
      continue;
    }

    strings.push(
      string.substring(lastEnd, match.index),
    );

    strings.push({ match: match[0] });

    lastEnd = match.index + match[0].length;
  }

  strings.push(
    string.substring(lastEnd),
  );

  let matchesIndex = 0;

  /* eslint-disable react/no-array-index-key, no-plusplus */
  return (
    <>
      {strings.map((el, i) => {
        if (typeof el === 'string') {
          return (
            <Fragment key={el + i}>
              {el}
            </Fragment>
          );
        }

        return (
          <Fragment key={el.match + i}>
            {substitutions[matchesIndex++]}
          </Fragment>
        );
      })}
    </>
  );
  /* eslint-enable react/no-array-index-key */
};
