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

  normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  } // prob wrong location
}
