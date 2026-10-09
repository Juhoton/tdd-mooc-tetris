export class Board {
  width;
  height;
  board;

  constructor(width, height) {
    this.width = width;
    this.height = height;
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
    this.board =
      `...
      .X.
      ...`;
  }

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  } // prob wrong location
}
