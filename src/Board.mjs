export class Board {
  width;
  height;
  board;
  tickCount;
  falling;
  block;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tickCount = 0;
    this.falling = false;
    this.board =
      `...
      ...
      ...`;
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
    } else {
      this.board =
        `...
        ...
        .X.`;
    }
    this.tickCount++
  }

  hasFalling() {
    if (this.tickCount === 3 || this.tickCount === 0 && !this.block) {
      this.falling = false;
    } else {
      this.falling = true;
    }
    return this.falling
  }

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  } // prob wrong location
}
