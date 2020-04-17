const { test } = require('../common/utils');
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
      const withoutEl = [
        curElements.slice(0, i),
        curElements.slice(i + 1),
      ].flat();
      recurse([...withoutEl], value); // don't use the current element
      recurse([...withoutEl], value / curElements[i]);
      recurse([...withoutEl], value - curElements[i]);
      recurse([...withoutEl], value + curElements[i]);
      recurse([...withoutEl], value * curElements[i]);
    }
  };
  recurse(elements, start);
  return found;
};
const ex = [1, 2, 3, 2, 1];
const ex2 = [15, 20, 13];
const ex3 = [-1];
const testArr = [
  [ex, 0, 12],
  [ex, 0, 3],
  [ex, 2, 2],
  [ex, 1, 12],
  [ex, 1, 48],
  [ex, -15, 5],
  [ex2, 13, 14],
  [ex2, 1, 14],
  [ex3, 2, 0],
];
const expectedArr = [true, true, true, true, false, false, false, true, false];

test(integerCombinations, (a, b) => a === b, testArr, expectedArr);
