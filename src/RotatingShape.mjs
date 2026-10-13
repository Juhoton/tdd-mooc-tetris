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

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
