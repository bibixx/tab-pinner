import React from 'react';

export const renderWithReplacedStrings = (strings: React.ReactElement[]) => strings
  .map<React.FC>((el) => () => el)
  .map((Comp, i) => {
    if (typeof Comp === 'string') {
      return Comp;
    }

    // eslint-disable-next-line react/no-array-index-key
    return <Comp key={i} />;
  });
