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
    this.setActiveBlock(block);
    this.activeBlockPosition = 0;
    this.insertBlockIntoBoard(this.activeBlock, this.activeBlockPosition);
  }

  setActiveBlock(block) {
      if (typeof block === "string") {
          this.activeBlock = this.createNewBlockFromString(block);
      } else {
          this.activeBlock = block;
      }
  }

  createNewBlockFromString(block) {
      return RotatingShape.fromString(block);
  }

  tick() {
    this.activeBlockPosition++;
    if (this.checkIfNextRowEmpty()) {
      this.removeActiveBlock();
      this.insertBlockIntoBoard(this.activeBlock, this.activeBlockPosition);
      }
    this.tickCount++;
  }

  checkIfNextRowEmpty() {
    let bool = true;
    if (this.activeBlockPosition >= this.height) {
      bool = false;
      this.falling = bool;
      return bool;
    }
    let boardRow = this.activeBlockPosition;
    this.boardMatrix[boardRow].forEach((square) => {
      if (square !== ".") bool = false;
    });
    this.falling = bool;
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

  insertBlockIntoBoard(block, position) {
    let boardRow = position;
    block.shapeMatrix.forEach((blockRow) => {
      let boardSquare = Math.floor((this.width - blockRow.length) / 2);
      blockRow.forEach((blockSquare) => {
        this.boardMatrix[boardRow][boardSquare] = blockSquare;
        boardSquare++;
      });
      boardRow++;
    });
  }

  hasFalling() {
    return this.falling;
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
