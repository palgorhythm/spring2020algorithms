const { test } = require('../common/utils');
const countElements = (arr) => {
  const counts = {};
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    if (counts.hasOwnProperty(cur)) {
      counts[cur]++;
    } else {
      counts[cur] = 1;
    }
  }
  let numElementsWithNextInArray = 0;
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i];
    if (counts.hasOwnProperty(cur + 1)) {
      numElementsWithNextInArray++;
    }
  }
  return numElementsWithNextInArray;
};

const testArr = [
  [[1, 2, 3]],
  [[1, 1, 3, 3, 5, 5, 7, 7]],
  [[1, 3, 2, 3, 5, 0]],
  [[1, 1, 2, 2]],
];
const expectedArr = [2, 0, 3, 2];

test(countElements, (a, b) => a === b, testArr, expectedArr);
