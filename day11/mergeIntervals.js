const { test, compareNestedArrays } = require('../common/utils');

const merge = (intervals) => {
  const sorted = intervals.sort((a, b) => {
    // O(n log n)
    if (a[0] < b[0]) {
      return -1;
    } else {
      return 1;
    }
  });

  console.log(sorted);
};

const input1 = [
  [2, 6],
  [1, 3],
  [8, 10],
  [15, 18],
];
const output1 = [
  [1, 6],
  [8, 10],
  [15, 18],
];
const input2 = [
  [1, 4],
  [4, 5],
];
const output2 = [[1, 5]];
const testArr = [[input1], [input2]];
const expectedArr = [output1, output2];
test(merge, compareNestedArrays(1), testArr, expectedArr);
