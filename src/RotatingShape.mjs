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
    let matrix = [];
    let revRow = this.shapeMatrix.length - 1;
    for (let row = 0; row < this.shapeMatrix.length; row++) {
      matrix.push([]);
      for (let pos = 0; pos < this.shapeMatrix.length; pos++) {
        matrix[row][pos] = this.shapeMatrix[pos][revRow];
      }
      revRow--;
    }
    return new RotatingShape(matrix);
  }
}
