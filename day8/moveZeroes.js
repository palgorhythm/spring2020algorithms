const { test } = require('../common/utils');

const moveZeroes = (nums) => {
  let lastZeroIndex = null;
  let i = 0;
  while (lastZeroIndex === null && i < nums.length) {
    if (nums[i] === 0) {
      lastZeroIndex = i;
    }
    i++;
  }
  for (let i = lastZeroIndex; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[lastZeroIndex], nums[i]] = [nums[i], nums[lastZeroIndex]];
      lastZeroIndex++;
    }
  }
  return nums;
};

const testArr = [[[0, 1, 0, 3, 12]]];
const expectedArr = [[1, 3, 12, 0, 0]];
const compare = (a, b) => {
  return a.every((el, i) => {
    return el === b[i];
  });
};

test(moveZeroes, compare, testArr, expectedArr);
