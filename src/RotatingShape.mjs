export class RotatingShape {
  shape;

  constructor(s) {
    this.shape = RotatingShape.normalize(s);
  }

  static fromString(s) {
    let rotatingShape = new RotatingShape(s);
    return rotatingShape;
  }

  toString() {
    return this.shape
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
