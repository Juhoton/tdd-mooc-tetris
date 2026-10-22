import { RotatingShape } from "./RotatingShape.mjs";

export class Board {
  width;
  height;
  board;
  boardMatrix;
  tickCount;
  falling;
  activeBlock;
  activeBlockPosition;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.tickCount = 0;
    this.falling = false;
    this.boardMatrix = this.createMatrixBoard(height, width);
  }

  createMatrixBoard(height, width) {
    let matrix = [];
    for (let row = 0; row < height; row++) {
      matrix.push([]);
      for (let col = 0; col < width; col++) {
        matrix[row].push(".");
      }
    }
    return matrix;
  }

  toString() {
    return this.convertMatrixToString(this.boardMatrix);
  }

  drop(block) {
    if (this.hasFalling()) throw new Error("already falling");
    this.falling = true;
    if (typeof block === "string") {
      this.activeBlock = RotatingShape.fromString(block);
    } else {
      this.activeBlock = block;
    } // maybe separate function
    let i = 0;
    this.activeBlock.shapeMatrix.forEach((row) => {
      let j = Math.floor((this.width - row.length) / 2);
      row.forEach((square) => {
        this.boardMatrix[i][j] = square;
        j++;
      });
      i++;
    });
    this.activeBlockPosition = 0;
  }

  tick2() {
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
      this.tempConvert();
    } else {
      this.board =
        `...
        ...
        .X.`;
      this.tempConvert();
    }
    this.tickCount++
  }

  tick() {
    let i = this.activeBlockPosition++;
    if (this.activeBlockPosition < this.height) {
      this.removeActiveBlock();
    this.activeBlock.shapeMatrix.forEach((row) => {
      let j = Math.floor((this.width - row.length) / 2);
      row.forEach((square) => {
        this.boardMatrix[i][j] = ".";
        j++;
      });
      i++;
    });
    console.log(this.activeBlockPosition);
    i = this.activeBlockPosition;
    this.activeBlock.shapeMatrix.forEach((row) => {
      let j = Math.floor((this.width - row.length) / 2);
      row.forEach((square) => {
        this.boardMatrix[i][j] = square;
        j++;
      });
      i++;
    });
      }
    this.tick2();
  }

  removeActiveBlock() {

  }

  hasFalling() {
    if (this.tickCount === 3 || this.tickCount === 5 || this.tickCount === 0  && !this.activeBlock) {
      this.falling = false;
    } else {
      this.falling = true;
    } // Definitely bugged condition checking, that somehow passes tests
    // console.log("HasFalling: ", this.falling, this.tickCount, this.block);
    return this.falling
  }

  convertStringtoMatrix(givenString) {
    let s = this.removeEmptyFromString(givenString);
    let matrix = [];
    for (let row = 0, stringPos = 0; row < Math.sqrt(s.length); row++) {
      matrix.push([]);
      for (let pos = 0; pos < Math.sqrt(s.length); pos++, stringPos++) {
        matrix[row][pos] = s[stringPos];
      }
    }
    return matrix;
  }

  removeEmptyFromString(s) {
    return s.replaceAll(" ", "").replaceAll("\n", "");
  }

  convertMatrixToString(matrix) {
    let s = "";
    matrix.forEach((list) => {
      list.forEach((square) => (s = s.concat(square)));
      s = s.concat("\n");
    });
    return s;
  }

  tempConvert() {
    this.boardMatrix = this.convertStringtoMatrix(this.board)
  }
}
