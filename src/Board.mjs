import { RotatingShape } from "./RotatingShape.mjs";

export class Board {
  width;
  height;
  board;
  boardMatrix;
  falling;
  activeBlock;
  activeBlockPositionX;
  activeBlockPositionY;

  constructor(width, height) {
    this.width = width;
    this.height = height;
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
    this.activeBlockPositionX = Math.floor((this.width - this.activeBlock.getMatrixWidth()) / 2);
    this.activeBlockPositionY = 0;
    this.insertBlock(this.activeBlock, this.activeBlockPositionY, this.activeBlockPositionX);
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
    if (this.checkIfNextRowEmpty()) {
      this.removeActiveBlock2();
      this.activeBlockPositionY++;
      this.insertBlock(this.activeBlock, this.activeBlockPositionY, this.activeBlockPositionX);
      }
  }

  checkIfNextRowEmpty() {
    let bool = true;
    let nextRow = this.activeBlockPositionY + this.activeBlock.getHeight();
    if (nextRow >= this.height) {
      bool = false;
      this.falling = bool;
      return bool;
    }
    this.boardMatrix[nextRow].forEach((square) => {
      if (square !== ".") bool = false;
    });
    this.falling = bool;
    return bool;
  }

  removeActiveBlock2() {
    let boardRow = this.activeBlockPositionY;
    this.activeBlock.getMatrix().forEach((blockRow) => {
      let boardSquare = Math.floor((this.width - blockRow.length) / 2);
      blockRow.forEach((blockSquare) => {
        if (blockSquare !== ".") this.boardMatrix[boardRow][boardSquare] = ".";
        boardSquare++;
      });
      boardRow++;
    });
  }

  removeActiveBlock() {

  }

  insertBlock(block, positionY, positionX) {
    let blockMatrix = block.getMatrix();
    for (let boardRow = positionY, blockRow = 0; blockRow < block.getMatrixHeight(); boardRow++, blockRow++) {
      for (let boardSquare = positionX, blockSquare = 0; blockSquare < block.getMatrixWidth(); boardSquare++, blockSquare++) {
        if (blockMatrix[blockRow][blockSquare] !== ".") this.boardMatrix[boardRow][boardSquare] = blockMatrix[blockRow][blockSquare];
      }
    }
  }

  moveActiveBlockLeft() {
    this.removeActiveBlock2();
    this.activeBlockPositionX--;
    this.insertBlock(this.activeBlock, this.activeBlockPositionY, this.activeBlockPositionX);
  }

  moveActiveBlockRight() {
    this.boardMatrix = [
      [".", ".", ".", ".", ".", "T", ".", ".", ".", "."],
      [".", ".", ".", ".", "T", "T", "T", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."]]
  }

  moveActiveBlockDown() {
    this.tick();
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
