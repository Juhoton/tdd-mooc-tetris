export class RotatingShape {
  shape;

  constructor(s) {
    this.shape = s;
  }

  static fromString(s) {
    let rotatingShape = new RotatingShape(s);
    return this.normalize(s);
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
