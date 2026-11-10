export default class User {
  constructor(public name: string) {}

  greet(): string {
    return `Привіт, я ${this.name}`;
  }
}