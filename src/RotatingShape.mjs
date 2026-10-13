import { each } from "lodash";

export class RotatingShape {
  shapeMatrix;

  constructor(s) {
    this.shapeMatrix = s;
  }

  static fromString(givenString) {
    let s = givenString.replaceAll(" ", "").replaceAll("\n", "")
    let matrix = [
      [s[0],s[1],s[2]],
      [s[3],s[4],s[5]],
      [s[6],s[7],s[8]]
    ];
    return new RotatingShape(matrix);
  }

  toString() {
    let s = "";
    this.shapeMatrix.forEach((list) => {
      list.forEach((square) => s = s.concat(square))
      s = s.concat("\n");
    });
    return s;
  }

  rotateRight() {
    let m = this.shapeMatrix;
    this.shapeMatrix = [
      [m[2][0], m[1][0], m[0][0]],
      [m[2][1], m[1][1], m[0][1]],
      [m[2][2], m[1][2], m[0][2]]
    ];
    return this;
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
