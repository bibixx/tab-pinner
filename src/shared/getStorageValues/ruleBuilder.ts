import { MatchType, PinnerRule } from '../../types/PinnerRule';

export class RuleBuilder {
  private id?: number;

  private active = false;

  private matchType: MatchType = 'simple';

  private pattern = '';

  private position: number | null = null;

  private name = '';

  setId(id: number) {
    this.id = id;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  setMatchType(matchType: MatchType) {
    this.matchType = matchType;
  }

  setPattern(pattern: string) {
    this.pattern = pattern;
  }

  setPosition(position: number | null) {
    this.position = position;
  }

  setName(name: string) {
    this.name = name;
  }

  getRule(): PinnerRule {
    if (this.id === undefined) {
      throw new Error('Id not present!');
    }

    return {
      id: this.id,
      name: this.name,
      active: this.active,
      matchType: this.matchType,
      pattern: this.pattern,
      position: this.position,
    };
  }
}
