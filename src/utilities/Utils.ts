class Utilities {
  isEmpty(str: string | number): boolean {
    return typeof str === "undefined" || str == null || str.length === 0;
  }

  getFirstWordFromText(str: string): string {
    return str.split(" ")[0];
  }
}

export const Utils = new Utilities();

// const Utils = {};

// Utils.isEmpty = function(str: string): boolean {
//   return typeof str === "undefined" || str == null || str.length === 0;
// }

// export default
