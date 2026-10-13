import { each } from "lodash";

export class RotatingShape {
  shapeMatrix;

  constructor(s) {
    this.shapeMatrix = s;
  }

  static fromString(givenString) {
    let s = givenString.replaceAll(" ", "").replaceAll("\n", "")
    let matrix = [];
    if (s.length === 9) {
      matrix = [
        [s[0],s[1],s[2]],
        [s[3],s[4],s[5]],
        [s[6],s[7],s[8]]
      ];
    }
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
    let matrix = [
      [this.shapeMatrix[2][0], this.shapeMatrix[1][0], this.shapeMatrix[0][0]],
      [this.shapeMatrix[2][1], this.shapeMatrix[1][1], this.shapeMatrix[0][1]],
      [this.shapeMatrix[2][2], this.shapeMatrix[1][2], this.shapeMatrix[0][2]]
    ];
    return new RotatingShape(matrix);
  }

  rotateLeft() {
    let matrix = [
      [this.shapeMatrix[0][2], this.shapeMatrix[1][2], this.shapeMatrix[2][2]],
      [this.shapeMatrix[0][1], this.shapeMatrix[1][1], this.shapeMatrix[2][1]],
      [this.shapeMatrix[0][0], this.shapeMatrix[1][0], this.shapeMatrix[2][0]]
    ];
    return new RotatingShape(matrix);
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
