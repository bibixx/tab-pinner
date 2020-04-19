import { PinnerRule } from "../../types/PinnerRule";

export class RuleBuilder {
  private id?: number;
  private active: boolean = false;
  private regexp: string = "";
  private position: number|null = null;
  private name: string = "";

  setId(id: number) {
    this.id = id;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  setRegexp(regexp: string) {
    this.regexp = regexp;
  }

  setPosition(position: number|null) {
    this.position = position;
  }

  setName(name: string) {
    this.name = name;
  }

  getRule(): PinnerRule {
    if (this.id === undefined) {
      throw new Error("Id not present!");
    }

    return {
      id: this.id,
      name: this.name,
      active: this.active,
      regexp: this.regexp,
      position: this.position,
    }
  }
}
