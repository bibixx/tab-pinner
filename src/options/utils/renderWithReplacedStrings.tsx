import React from 'react';

export const renderWithReplacedStrings = (strings: React.ReactElement[]) => strings
  .map((el) => {
    if (typeof el === 'string') {
      return () => <span>{el}</span>;
    }

    return () => el;
  })
  // eslint-disable-next-line react/no-array-index-key
  .map((Comp, i) => <Comp key={i} />);
