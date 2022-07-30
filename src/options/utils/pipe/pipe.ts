export const pipe = <TArgs extends any[], R1, R2>(
  fn1: (...args: TArgs) => R1,
  fn2: (a: R1) => R2,
) => (...args: TArgs): R2 => fn2(fn1(...args));
