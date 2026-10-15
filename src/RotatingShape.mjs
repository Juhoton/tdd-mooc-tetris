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
    let tempMatrix = this.shapeMatrix.slice();
    if (!this.checkIfEqualEmptyRows(tempMatrix)) tempMatrix = this.moveFirstRowToLastIfEmpty(tempMatrix);
    let s = "";
    tempMatrix.forEach((list) => {
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

  moveFirstRowToLastIfEmpty(matrix) {
    if (this.checkIfRowEmpty(matrix, 0)) {
      matrix.push(matrix[0]);
      matrix = matrix.slice(1);
    }
    return matrix;
  }

  checkIfRowEmpty(matrix, row) {
    let bool = true;
    matrix[row].forEach((square) => {
      if (square !== ".") bool = false;
    });
    return bool;
  }

  checkIfEqualEmptyRows(matrix) {
    let bool = false;
    let count = 0;
    for (let row = 0; row < matrix.length; row++) {
      if (this.checkIfRowEmpty(matrix, row)) count++;
    }
    if (count % 2 === 0) bool = true;
    return bool;
  }
}
