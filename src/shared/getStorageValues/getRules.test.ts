import { describe, expect, it } from 'vitest';
import { getRules } from './getRules';

const read = (rule: Record<string, unknown>) =>
  getRules([rule as Record<string, string>])[0];

describe('getRules', () => {
  it('reads old rules as regexp rules', () => {
    expect(read({ id: 1, active: true, regexp: '^a$' })).toMatchObject({
      matchType: 'regexp',
      pattern: '^a$',
    });
  });

  it('keeps new rules as stored', () => {
    expect(
      read({ id: 1, active: true, matchType: 'simple', pattern: 'a.com' }),
    ).toMatchObject({ matchType: 'simple', pattern: 'a.com' });

    expect(
      read({ id: 1, active: true, matchType: 'regexp', pattern: '^a$' }),
    ).toMatchObject({ matchType: 'regexp', pattern: '^a$' });
  });

  it('prefers pattern over a leftover regexp field', () => {
    expect(
      read({ id: 1, matchType: 'simple', pattern: 'a.com', regexp: '^b$' }),
    ).toMatchObject({ matchType: 'simple', pattern: 'a.com' });
  });

  it('falls back to an empty simple rule', () => {
    expect(read({ id: 1 })).toMatchObject({ matchType: 'simple', pattern: '' });
  });

  it('does not write the old field back', () => {
    expect(read({ id: 1, regexp: '^a$' })).not.toHaveProperty('regexp');
  });
});
