const { test } = require('../common/utils');

// dot product of sparse vectors
// https://leetcode.com/discuss/interview-question/124823/dot-product-of-sparse-vector

class SparseVector {
  constructor(vector) {
    this.vector = vector;
  }
  static dotProduct(aVec, bVec) {
    const a = aVec.vector;
    const b = bVec.vector;
    let aIndex = 0;
    let bIndex = 0;
    let result = 0;
    while (aIndex < a.length && bIndex < b.length) {
      const aVectorIndex = a[aIndex][0];
      const bVectorIndex = b[bIndex][0];
      if (aVectorIndex === bVectorIndex) {
        result += a[aIndex][1] * b[bIndex][1];
        aIndex++;
        bIndex++;
      } else if (aVectorIndex < bVectorIndex) {
        aIndex++;
      } else {
        bIndex++;
      }
    }
    return result;
  }
}

const t1a = new SparseVector([
  [0, 1],
  [1, 4],
  [5, 8],
  [100, 1],
  [101, 10],
]);
const t1b = new SparseVector([
  [2, 4],
  [5, 1],
  [14, 1],
  [100, 10],
]);
const e1 = 18;

const t2a = new SparseVector([
  [0, 1],
  [1, 4],
  [5, 8],
  [100, 1],
  [101, 10],
]);
const t2b = new SparseVector([
  [1, 4],
  [14, 1],
  [100, 10],
]);
const e2 = 26;

const testArr = [
  [t1a, t1b],
  [t2a, t2b],
];
const expectedArr = [e1, e2];

test(SparseVector.dotProduct, (a, b) => a === b, testArr, expectedArr);
