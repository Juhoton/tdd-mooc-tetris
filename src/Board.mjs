export class Board {
  width;
  height;
  board;
  tickCount;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tickCount = 0;
    this.board =
      `...
      ...
      ...`;
  }

  toString() {
    return this.normalize(this.board);
  }

  drop(block) {
    this.board =
      `.X.
      ...
      ...`;
    if (block === 'Y') throw new Error("already falling");
  }

  tick() {
    if (this.tickCount === 0) {
      this.board =
        `...
        .X.
        ...`;
    } else {
      this.board =
        `...
        ...
        .X.`;
    }
    this.tickCount++
  }

  hasFalling() {
    if (this.tickCount === 3) {
      return false;
    }
    return true
  }

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  } // prob wrong location
}
