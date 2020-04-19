export type Mappings = [RegExp|string, React.ReactElement];
type RegExpMappings = [RegExp, any];
type FoundRecord = { start: number, end: number, mappingIndex: number };

const findFromIndex = (text: string, regexp: RegExp, indexFrom: number) => {
  const r = regexp.exec(text.substring(indexFrom));

  if (r === null) {
    return null;
  }

  return { found: r[0], index: r.index + indexFrom };
};

const findUntilNothing = (stringComponentMappings: RegExpMappings[], text: string) => {
  let found = false;
  let index = 0;
  let foundRecords: FoundRecord[] = [];

  do {
    found = false;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < stringComponentMappings.length; i++) {
      const [regexp] = stringComponentMappings[i];
      const ret = findFromIndex(text, regexp, index);

      if (ret !== null) {
        const end = ret.found.length + ret.index;

        foundRecords = [
          ...foundRecords,
          {
            start: ret.index,
            end,
            mappingIndex: i,
          },
        ];

        found = true;
        index = end;
        break;
      }
    }
  } while (found);

  return foundRecords;
};

const p = (
  records: FoundRecord[],
  stringComponentMappings: RegExpMappings[],
  string: string,
) => {
  let lastStart = 0;
  let acc = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < records.length; i++) {
    const curr = records[i];

    const { start, end, mappingIndex } = curr;

    const out: any[] = [
      ...acc,
      ...(i === 0 ? [string.substring(lastStart, start)] : []),
      stringComponentMappings[mappingIndex][1],
      string.substring(end, records[i + 1]?.start),
    ];

    lastStart = end;

    acc = out;
  }

  return acc;
};

export const replaceStringsWithComponents = (
  stringComponentMappings: Mappings[],
  string: string,
) => {
  const mappingsWithRegex = stringComponentMappings.map<RegExpMappings>(([searchString, value]) => {
    if (typeof searchString === 'string') {
      return [new RegExp(searchString.replace('$', '\\$')), value];
    }

    return [searchString, value];
  });

  const matches = findUntilNothing(mappingsWithRegex, string);

  return p(matches, mappingsWithRegex, string);
};
