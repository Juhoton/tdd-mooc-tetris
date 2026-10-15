export class RotatingShape {
  shapeMatrix;
  orientationCount;
  currentOrientation;

  constructor(s, o, c) {
    this.shapeMatrix = s;
    this.orientationCount = o;
    console.log("New block c : ", c);
    this.currentOrientation = c || 1;
    console.log("Init Orientation: ", this.currentOrientation);
  }

  static fromString(givenString, orientations) {
    let s = RotatingShape.removeEmptyFromString(givenString);
    let matrix = [];
    for (let row = 0, stringPos = 0; row < Math.sqrt(s.length); row++) {
      matrix.push([]);
      for (let pos = 0; pos < Math.sqrt(s.length); pos++, stringPos++) {
        matrix[row][pos] = s[stringPos];
      }
    }
    return new RotatingShape(matrix, orientations);
  }

  static removeEmptyFromString(s) {
    return s.replaceAll(" ", "").replaceAll("\n", "");
  }

  toString() {
    let tempMatrix = this.shapeMatrix.slice();
    // if (!this.checkIfEqualEmptyRows(tempMatrix)) tempMatrix = this.moveFirstRowToLastIfEmpty(tempMatrix);
    // if (!this.checkIfEqualEmptyColumns(tempMatrix)) tempMatrix = this.moveFirstColumnToLastIfEmpty(tempMatrix);
    // console.log("tempMatrix: ", tempMatrix);
    let s = "";
    tempMatrix.forEach((list) => {
      list.forEach((square) => (s = s.concat(square)));
      s = s.concat("\n");
    });
    return s;
  }

  rotateRight() {
    if (this.orientationCount === 2 && this.currentOrientation === 2) return this.rotateLeft();
    if (this.orientationCount === 1) return this;
    let matrix = [];
    let mLen = this.shapeMatrix.length;
    for (let row = 0; row < mLen; row++) {
      matrix.push([]);
      for (let pos = 0, revPos = mLen - 1; pos < mLen; pos++, revPos--) {
        matrix[row][pos] = this.shapeMatrix[revPos][row];
      }
    }
    return new RotatingShape(matrix, this.orientationCount, this.currentOrientation + 1);
  }

  rotateLeft() {
    if (this.orientationCount === 2 && this.currentOrientation === 1) return this.rotateRight();
    if (this.orientationCount === 1) return this;
    let matrix = [];
    let mLen = this.shapeMatrix.length;
    for (let row = 0, revRow = mLen - 1; row < mLen; row++, revRow--) {
      matrix.push([]);
      for (let pos = 0; pos < mLen; pos++) {
        matrix[row][pos] = this.shapeMatrix[pos][revRow];
      }
    }
    return new RotatingShape(matrix, this.orientationCount, this.currentOrientation - 1);
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
    console.log("equal rows: ", bool, count % 2);
    return bool;
  }
}
