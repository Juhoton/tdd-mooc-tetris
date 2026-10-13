export class RotatingShape {
  shape;

  constructor(s) {
    this.shape = s;
  }

  static fromString(s) {
    let temp = [
      [s[0],s[1],s[2]],
      [s[3],s[4],s[5]],
      [s[6],s[7],s[8]]
    ];
    let rotatingShape = new RotatingShape(temp);
    return this.normalize(s);
  }

  toString() {
    return this.shape
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
