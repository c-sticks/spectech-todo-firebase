// const array = ["1", "2", "3", "454", "x", "y"];
// console.log(array);
// const one = array[0];
// const two = array[1];
// const three = array[1];
// const [one, two, three, ...rest] = array;
// console.log(one, two, three, rest);

const array = [1, 2, 343, 4, 5, 5];
// expect => [2,4, 686, 8, 10, 10];
// let result = [];
// for (const e of array) {
//   result.push(e * 2);
// }
// console.log(result);
// console.log(array.map((e) => e * 2));

const n = [-999, ...array, 999];
console.log(n);
