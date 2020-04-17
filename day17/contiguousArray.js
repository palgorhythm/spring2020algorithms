const { test } = require('../common/utils');
const findMaxLengthRecursive = (nums) => {
  if (nums.length === 0) {
    return 0;
  }
  let maxLength = 0;
  const totalNumOnes = nums.reduce((acc, cur) => {
    return cur === 1 ? acc + 1 : acc;
  }, 0);
  const totalNumZeros = nums.reduce((acc, cur) => {
    return cur === 0 ? acc + 1 : acc;
  }, 0);
  const recurse = (left, right, numOnes, numZeros) => {
    const curLength = right - left + 1;
    if (numOnes === numZeros && curLength > maxLength) {
      maxLength = curLength;
      return;
    } else if (left === right) {
      return;
    }
    const newNumOnesLeft = nums[left] === 1 ? numOnes - 1 : numOnes;
    const newNumZerosLeft = nums[left] === 0 ? numZeros - 1 : numZeros;
    const newNumOnesRight = nums[right] === 1 ? numOnes - 1 : numOnes;
    const newNumZerosRight = nums[right] === 0 ? numZeros - 1 : numZeros;
    recurse(left + 1, right, newNumOnesLeft, newNumZerosLeft);
    recurse(left, right - 1, newNumOnesRight, newNumZerosRight);
  };
  recurse(0, nums.length - 1, totalNumOnes, totalNumZeros);
  return maxLength;
};

const findMaxLengthQuadratic = (nums) => {
  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    let numZeros = 0;
    let numOnes = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) {
        numZeros++;
      } else {
        numOnes++;
      }
      const lengthOfSubArray = j - i + 1;
      if (numZeros === numOnes && lengthOfSubArray > maxLength) {
        maxLength = lengthOfSubArray;
      }
    }
  }
  return maxLength;
};

const findMaxLength = (nums) => {
  const seenCountsToIndices = { 0: -1 };
  let count = 0;
  let maxLength = 0;
  for (let i = 0; i < nums.length; i++) {
    count += nums[i] === 1 ? 1 : -1;
    if (!seenCountsToIndices.hasOwnProperty(count)) {
      seenCountsToIndices[count] = i;
    } else if (
      seenCountsToIndices.hasOwnProperty(count) &&
      i - seenCountsToIndices[count] > maxLength
    ) {
      maxLength = i - seenCountsToIndices[count];
    }
  }
  return maxLength;
};

const testArr = [
  [[0, 1]],
  [[0, 1, 0]],
  [
    [
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      1,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      1,
      1,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      0,
      1,
      0,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      1,
      1,
      1,
      0,
      0,
      1,
      0,
      1,
      1,
    ],
  ],
];
const expectedArr = [2, 2, 94];

test(findMaxLength, (a, b) => a === b, testArr, expectedArr);
