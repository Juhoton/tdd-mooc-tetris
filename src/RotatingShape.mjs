import { each } from "lodash";

export class RotatingShape {
  shape;

  constructor(s) {
    this.shape = s;
  }

  static fromString(givenString) {
    let s = givenString.replaceAll(" ", "").replaceAll("\n", "")
    let tempShape = [
      [s[0],s[1],s[2]],
      [s[3],s[4],s[5]],
      [s[6],s[7],s[8]]
    ];
    let rotatingShape = new RotatingShape(tempShape);
    return rotatingShape;
  }

  toString() {
    let temp = "";
    this.shape.forEach((list) => {
      list.forEach((square) => temp = temp.concat(square))
      temp = temp.concat("\n");
    });
    return temp;
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
