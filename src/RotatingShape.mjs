export class RotatingShape {
  shapeMatrix;
  orientationCount;
  currentOrientation;
  width;
  height;

  constructor(s, o, c) {
    this.shapeMatrix = s;
    this.orientationCount = o;
    this.currentOrientation = c || 1;
    this.width = s[0].length;
    this.height = s.length;
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
    let s = "";
    tempMatrix.forEach((list) => {
      list.forEach((square) => (s = s.concat(square)));
      s = s.concat("\n");
    });
    return s;
  }

  getWidth() {
    return this.width;
  }

  rotateRight() {
    if (this.checkIfCannotRotate()) return this;
    if (this.checkIfCanOnlyRotateTwice() && this.currentOrientation === 2) return this.rotateLeft();
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
    if (this.checkIfCannotRotate()) return this;
    if (this.checkIfCanOnlyRotateTwice() && this.currentOrientation === 1) return this.rotateRight();
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

  checkIfCanOnlyRotateTwice() {
    return this.orientationCount === 2;
  }

  checkIfCannotRotate() {
    return this.orientationCount === 1;
  }
}
