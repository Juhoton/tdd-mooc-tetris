export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let board =
      `...
...
...
`; // ugly indent
    return board;
  }
}
