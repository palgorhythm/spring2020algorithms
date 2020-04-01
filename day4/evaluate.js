const { test } = require('../common/utils');

const multDiv = str => {
  return str.split(/\*/).reduce((outerAcc, outerCur) => {
    const splitDiv = outerCur.split(/\//);
    const divResult = splitDiv.reduce((innerAcc, innerCur) => {
      return parseFloat(innerAcc) / parseFloat(innerCur);
    });
    return parseFloat(outerAcc) * parseFloat(divResult);
  }, 1);
};

const evaluate = str => {
  const strCopy = str;
  const addends = strCopy.replace(/-/g, '+-').split(/\+/);
  return addends.reduce((acc, cur) => {
    return parseInt(acc) + multDiv(cur);
  }, 0);
};

const testArr = [
  ['10-9/2'],
  ['2 + 1'],
  ['1*1/1*1+2'],
  ['1+2/2+1-1+3*1-5'],
  ['8/2/2+1-3+3*1-3']
];
const expectedArr = [5.5, 3, 3, 0, 0];
test([evaluate, null], (a, b) => a === b, testArr, expectedArr);
