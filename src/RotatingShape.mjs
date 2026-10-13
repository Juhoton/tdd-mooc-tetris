import { each } from "lodash";

export class RotatingShape {
  shape;

  constructor(s) {
    this.shape = s;
  }

  static fromString(s) {
    let temp = [
      [s[0],s[1],s[2]],
      [s[3],s[4],s[5]],
      [s[6],s[7],s[8]]
    ];
    console.log(temp);
    let rotatingShape = new RotatingShape(temp);
    return this.normalize(s);
  }

  toString() {
    let temp = "";
    this.shape.forEach((list) =>
      list.forEach((square) =>
        temp = temp.concat(square))
    );
    console.log(temp);
    return temp;
  }

  static normalize(s) {
    return s.replaceAll(" ", "").trim() + "\n";
  }
}
