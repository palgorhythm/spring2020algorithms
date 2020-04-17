const { test } = require('../common/utils');
const copyWithoutIndex = (arr, index) => {
  return arr.filter((el, i) => index !== i);
};

const integerCombinations = (elements, start, target) => {
  let found = false;
  const recurse = (curElements, value) => {
    if (found) {
      return;
    }
    if (value === target) {
      found = true;
      return;
    }
    if (curElements.length === 0) {
      return;
    }

    for (let i = 0; i < curElements.length; i++) {
      recurse(copyWithoutIndex(curElements, i), value); // don't use the current element
      recurse(copyWithoutIndex(curElements, i), value / curElements[i]);
      recurse(copyWithoutIndex(curElements, i), value - curElements[i]);
      recurse(copyWithoutIndex(curElements, i), value + curElements[i]);
      recurse(copyWithoutIndex(curElements, i), value * curElements[i]);
    }
  };
  recurse(elements, start);
  return found;
};
const ex = [1, 2, 3, 2, 1];
// [ex, 0, 3],
// [ex, 2, 2],
// [ex, 1, 12],
const testArr = [[ex, 0, 12]];
const expectedArr = [true, true, true, false];

test(integerCombinations, (a, b) => a === b, testArr, expectedArr);
