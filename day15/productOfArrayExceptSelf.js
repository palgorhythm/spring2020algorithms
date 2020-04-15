const { test, compareNestedArrays } = require('../common/utils');

const productExceptSelf = (nums) => {
  let numZeros = 0;
  const p = nums.reduce((acc, cur) => {
    if (cur !== 0) {
      return acc * cur;
    } else {
      numZeros++;
      return acc;
    }
  }, 1);
  return nums.map((el) => {
    if (numZeros === 0) {
      return p / el;
    } else if (numZeros === 1 && el === 0) {
      return p;
    } else {
      return 0;
    }
  });
};

const productExceptSelfLeftRight = (nums) => {
  const L = Array(nums.length);
  const R = Array(nums.length);
  L[0] = nums[0];
  R[nums.length - 1] = nums[nums.length - 1];
  for (let i = 1; i < nums.length; i++) {
    const j = nums.length - 1 - i;
    L[i] = L[i - 1] * nums[i];
    R[j] = R[j + 1] * nums[j];
  }
  return nums.map((_, index) => {
    const leftProduct = L[index - 1] === undefined ? 1 : L[index - 1];
    const rightProduct = R[index + 1] === undefined ? 1 : R[index + 1];
    return leftProduct * rightProduct;
  });
};

const t1 = [1, 2, 3, 4];
const t2 = [0, 0];
const testArr = [[t1], [t2]];
const e1 = [24, 12, 8, 6];
const e2 = [0, 0];
const expectedArr = [e1, e2];

productExceptSelfLeftRight(t1);

test(productExceptSelfLeftRight, compareNestedArrays(0), testArr, expectedArr);
