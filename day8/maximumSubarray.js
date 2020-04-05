const { test } = require('../common/utils');
const maxSubArrayRecursive = (arr) => {
  // O(2^n) solution
  if (arr.length === 0) return 0;
  const sum = (arr) => {
    return arr.reduce((acc, cur) => {
      return acc + cur;
    }, 0);
  };
  let leftIndex = 0;
  let rightIndex = arr.length;
  let maxSum = arr[leftIndex];
  const recurse = (l, r) => {
    const s = sum(arr.slice(l, r));
    if (l === r) return;
    if (s > maxSum) {
      maxSum = s;
    }
    recurse(l + 1, r);
    recurse(l, r - 1);
  };
  recurse(leftIndex, rightIndex);
  return maxSum;
};

const maxSubArrayLinear = (arr) => {
  let cur = arr[0];
  let localMax = arr[0];
  let globalMax = arr[0];
  for (let i = 1; i < arr.length; i++) {
    cur = arr[i];
    localMax = localMax + cur;
    if (cur > localMax) {
      localMax = cur;
    }
    if (localMax > globalMax) {
      globalMax = localMax;
    }
  }
  return globalMax;
};

const testArr = [
  [[-2, 1, -3, 4, -1, 2, 1, -5, 4]],
  [
    [
      -30,
      -74,
      -22,
      -20,
      -85,
      -47,
      -30,
      -14,
      -58,
      -69,
      -40,
      -13,
      -27,
      -87,
      -95,
      -40,
      -47,
      -30,
      -14,
      -58,
      -69,
      -40,
      1,
    ],
  ],
];
const expectedArr = [6, 1];
test(maxSubArrayRecursive, (a, b) => a === b, testArr, expectedArr);
test(maxSubArrayLinear, (a, b) => a === b, testArr, expectedArr);
