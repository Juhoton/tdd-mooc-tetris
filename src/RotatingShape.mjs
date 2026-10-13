import { each } from "lodash";

export class RotatingShape {
  shapeMatrix;

  constructor(s) {
    this.shapeMatrix = s;
  }

  static fromString(givenString) {
    let s = givenString.replaceAll(" ", "").replaceAll("\n", "")
    let matrix = [];
    let sPos = 0;
    for (let row = 0; row < Math.sqrt(s.length); row++) {
      matrix.push([]);
      for (let pos = 0; pos < Math.sqrt(s.length); pos++) {
        matrix[row][pos] = s[sPos];
        sPos++;
      }
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
    let matrix = [];
    for (let row = 0; row < this.shapeMatrix.length; row++) {
      matrix.push([]);
      let revPos = this.shapeMatrix.length - 1;
      for (let pos = 0; pos < this.shapeMatrix.length; pos++) {
        matrix[row][pos] = this.shapeMatrix[revPos][row];
        revPos--;
      }
    }
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
