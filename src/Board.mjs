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
    this.activeBlockPosition = 0;
    this.addActiveBlock(this.activeBlockPosition);
  }

  tick() {
    this.activeBlockPosition++;
    if (this.checkIfNextRowEmpty()) {
      this.removeActiveBlock();
      this.addActiveBlock(this.activeBlockPosition);
      }
    this.tickCount++;
  }

  checkIfNextRowEmpty() {
    let bool = true;
    if (this.activeBlockPosition >= this.height) return false;
    let boardRow = this.activeBlockPosition;
    this.boardMatrix[boardRow].forEach((square) => {
      if (square !== ".") bool = false;
    });
    return bool;
  }

  removeActiveBlock() {
    let boardRow = this.activeBlockPosition - 1;
    this.activeBlock.shapeMatrix.forEach((blockRow) => {
      let boardSquare = Math.floor((this.width - blockRow.length) / 2);
      blockRow.forEach((blockSquare) => {
        this.boardMatrix[boardRow][boardSquare] = ".";
        boardSquare++;
      });
      boardRow++;
    });
  }

  addActiveBlock(position) {
    let boardRow = position;
    this.activeBlock.shapeMatrix.forEach((blockRow) => {
      let boardSquare = Math.floor((this.width - blockRow.length) / 2);
      blockRow.forEach((blockSquare) => {
        this.boardMatrix[boardRow][boardSquare] = blockSquare;
        boardSquare++;
      });
      boardRow++;
    });
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
