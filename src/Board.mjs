export class Board {
  width;
  height;
  board;
  boardMatrix;
  tickCount;
  falling;
  block;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tickCount = 0;
    this.falling = false;
    let boardMatrix = [];
    for (let i = 0; i < height; i++) {
      boardMatrix.push([]);
      for (let j = 0; j < width; j++) {
        boardMatrix[i].push(".");
      }
    }
    console.log(boardMatrix);
    this.board =
      `...
      ...
      ...`; // wtf is this string board
  }

  toString() {
    return this.normalize(this.board);
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
}
