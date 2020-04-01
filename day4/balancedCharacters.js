const { test } = require('../common/utils');

const balancedCharacters = str => {
  const cache = {};
  str.split('').forEach(e => {
    if (cache.hasOwnProperty(e)) {
      cache[e]++;
    } else {
      cache[e] = 1;
    }
  });
  const cacheKeys = Object.keys(cache);
  let balancedNum = cache[cacheKeys[0]];
  for (let i = 0; i < cacheKeys.length; i++) {
    if (cache[cacheKeys[i]] !== balancedNum) {
      return false;
    }
  }
  return true;
};

const testArr = [['aabbcc'], ['aabbccd'], ['aabbbcc']];
const expectedArr = [true, false, false];
test([balancedCharacters, null], (a, b) => a === b, testArr, expectedArr);
