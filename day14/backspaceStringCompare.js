const { test } = require('../common/utils');
// https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/529/week-2/3291/

const backspaceCompare = (s, t) => {
  let bStack = [];
  let sFinal = '';
  let tFinal = '';
  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === '#') {
      bStack.push('#');
    } else if (bStack.length > 0) {
      bStack.pop();
    } else {
      sFinal = s[i] + sFinal;
    }
  }
  bStack = [];
  for (let i = t.length - 1; i >= 0; i--) {
    if (t[i] === '#') {
      bStack.push('#');
    } else if (bStack.length > 0) {
      bStack.pop();
    } else {
      tFinal = t[i] + tFinal;
    }
  }
  return sFinal === tFinal;
};

const t1 = ['ab##', 'c#d#'];
const t2 = ['a##c', '#a#c'];
const t3 = ['a#c', 'b'];
const e = [true, true, false];
test(backspaceCompare, (a, b) => a === b, [t1, t2, t3], e);
