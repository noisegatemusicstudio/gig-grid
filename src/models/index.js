export class Band {
  constructor(init) {
    Object.assign(this, init);
  }
  static copyOf(source, mutator) {
    const draft = { ...source };
    mutator(draft);
    return new Band(draft);
  }
}
