import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = RotatingShape.fromString(
    `.T.
    TTT
    ...`, 4);

  static I_SHAPE = RotatingShape.fromString(
    `.....
     .....
     IIII.
     .....
     .....`, 2);

  static O_SHAPE = RotatingShape.fromString(
    `.OO
     .OO
     ...`, 1);
}
