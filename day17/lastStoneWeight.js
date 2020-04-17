const { test } = require('../common/utils');

const lastStoneWeight = (stones) => {
  while (stones.length > 1) {
    let heaviestIndex = 0;
    let secondHeaviestIndex = 1;
    for (let i = 1; i < stones.length; i++) {
      if (stones[i] > stones[heaviestIndex]) {
        secondHeaviestIndex = heaviestIndex;
        heaviestIndex = i;
      } else if (stones[i] > stones[secondHeaviestIndex]) {
        secondHeaviestIndex = i;
      }
    }
    if (stones[heaviestIndex] === stones[secondHeaviestIndex]) {
      stones = [
        ...stones.slice(0, heaviestIndex),
        ...stones.slice(heaviestIndex + 1),
      ];
      stones = [
        ...stones.slice(0, secondHeaviestIndex - 1),
        ...stones.slice(secondHeaviestIndex),
      ];
    } else {
      const diff = Math.abs(
        stones[heaviestIndex] - stones[secondHeaviestIndex]
      );
      stones[heaviestIndex] = diff;
      stones = [
        ...stones.slice(0, secondHeaviestIndex),
        ...stones.slice(secondHeaviestIndex + 1),
      ];
    }
  }
  return stones.length === 1 ? stones[0] : 0;
};
const testArr = [[[2, 7, 4, 1, 8, 1]], [[2, 2]], [[1, 3]]];
const expectedArr = [1, 0, 2];
test(lastStoneWeight, (a, b) => a === b, testArr, expectedArr);
