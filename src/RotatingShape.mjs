export class RotatingShape {

  static fromString(s) {
    return this.normalize(s);
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
