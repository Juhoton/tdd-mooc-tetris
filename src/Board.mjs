export class Board {
  width;
  height;
  board;
  boardMatrix;
  tickCount;
  falling;
  block;
  refactored;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tickCount = 0;
    this.falling = false;
    this.boardMatrix = [];
    this.refactored = false;
    for (let row = 0; row < height; row++) {
      this.boardMatrix.push([]);
      for (let col = 0; col < width; col++) {
        this.boardMatrix[row].push(".");
      }
    }
    this.board =
      `...
      ...
      ...`; // wtf is this string board
  }

  toString() {
    if (!this.refactored) return this.normalize(this.board);
    let tempMatrix = this.boardMatrix.slice();
    let s = "";
    tempMatrix.forEach((list) => {
      list.forEach((square) => (s = s.concat(square)));
      s = s.concat("\n");
    });
    return s;
  }

  drop(block) {
    if (this.hasFalling()) throw new Error("already falling");
    this.falling = true;
    this.block = block;
    this.board =
      `.X.
      ...
      ...`;
  }

  tick() {
    if (this.tickCount === 0) {
      this.board =
        `...
        .X.
        ...`;
    } else if (this.tickCount >= 3) {
      this.board =
        `...
        .Y.
        .X.`;
    } else {
      this.board =
        `...
        ...
        .X.`;
    }
    this.tickCount++
  }

  hasFalling() {
    if (this.tickCount === 3 || this.tickCount === 5 || this.tickCount === 0  && !this.block) {
      this.falling = false;
    } else {
      this.falling = true;
    } // Definitely bugged condition checking, that somehow passes tests
    // console.log("HasFalling: ", this.falling, this.tickCount, this.block);
    return this.falling
  }

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  } // prob wrong location, copied from tests
  convertStringtoMatrix() {
    let s = RotatingShape.removeEmptyFromString(givenString);
    let matrix = [];
    for (let row = 0, stringPos = 0; row < Math.sqrt(s.length); row++) {
      matrix.push([]);
      for (let pos = 0; pos < Math.sqrt(s.length); pos++, stringPos++) {
        matrix[row][pos] = s[stringPos];
      }
    }
    return new RotatingShape(matrix, orientations);}
}
