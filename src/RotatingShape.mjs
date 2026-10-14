import { each, forEach } from "lodash";

export class RotatingShape {
  shapeMatrix;

  constructor(s) {
    this.shapeMatrix = s;
  }

  static fromString(givenString) {
    let s = RotatingShape.removeEmptyFromString(givenString);
    let matrix = [];
    for (let row = 0, stringPos = 0; row < Math.sqrt(s.length); row++) {
      matrix.push([]);
      for (let pos = 0; pos < Math.sqrt(s.length); pos++, stringPos++) {
        matrix[row][pos] = s[stringPos];
      }
    }
    return new RotatingShape(matrix);
  }

  static removeEmptyFromString(s) {
    return s.replaceAll(" ", "").replaceAll("\n", "");
  }

  toString() {
    let s = "";
    this.shapeMatrix.forEach((list) => {
      list.forEach((square) => (s = s.concat(square)));
      s = s.concat("\n");
    });
    return s;
  }

  rotateRight() {
    let matrix = [];
    let mLen = this.shapeMatrix.length;
    for (let row = 0; row < mLen; row++) {
      matrix.push([]);
      for (let pos = 0, revPos = mLen - 1; pos < mLen; pos++, revPos--) {
        matrix[row][pos] = this.shapeMatrix[revPos][row];
      }
    }
    return new RotatingShape(matrix);
  }

  rotateLeft() {
    let matrix = [];
    let mLen = this.shapeMatrix.length;
    for (let row = 0, revRow = mLen - 1; row < mLen; row++, revRow--) {
      matrix.push([]);
      for (let pos = 0; pos < mLen; pos++) {
        matrix[row][pos] = this.shapeMatrix[pos][revRow];
      }
    }
    return new RotatingShape(matrix);
  }

  checkIfFirstRowEmpty(matrix) {
    matrix[0].forEach((square) => {
      if (square !== '.') return false;
    })
    return true;
  }
}
