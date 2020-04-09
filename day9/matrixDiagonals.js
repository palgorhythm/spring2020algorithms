const { test } = require('../common/utils');

// matrix n x n of only lowercase strings
// traverse all diagonals starting with the bottom left
// build a string of length n from each diagonal (repeat elt of diag if you go over)
// sort these strings and return the list of indices of the strings

const matrixDiagonal = (matrix) => {
  const n = matrix.length;
  const outArr = [];
  for (let i = 0; i < 2 * n - 1; i++) {
    let diagLength;
    if (i <= n - 1) {
      diagLength = i + 1;
    } else {
      diagLength = n - (i - n + 1);
    }
    let curString = '';
    for (let j = 0; j < n; j++) {
      let x = 0;
      let y = 0;
      if (i <= n - 1) {
        x = n - 1 - i;
      } else {
        y = i - (n - 1);
      }
      x += j % diagLength;
      y += j % diagLength;
      curString += matrix[x][y];
    }
    outArr.push({ ind: i, str: curString });
  }
  return outArr
    .sort((a, b) => {
      if (a.str < b.str) {
        return -1;
      } else {
        return 1;
      }
    })
    .map((el) => {
      return el.ind;
    });
};

const test1 = [
  ['a', 'b', 'c', 'a'],
  ['a', 'b', 'c', 'd'],
  ['a', 'b', 'c', 'd'],
  ['b', 'b', 'c', 'd'],
];
const expected1 = [6, 1, 2, 3, 0, 4, 5];
const testArr = [[test1]];
const expectedArr = [expected1];
const compareFn = (a, b) => {
  return a.every((x, index) => {
    return x === b[index];
  });
};

test(matrixDiagonal, compareFn, testArr, expectedArr);

const printMatrixDiagonals = (array) => {
  const mLength = array.length;
  const nLength = array[0].length;
  const maxLength = Math.max(nLength, mLength);
  for (let k = 0; k <= 2 * maxLength - 1; k++) {
    const currentDiagonal = [];
    for (let m = 0; m < mLength; m++) {
      // bad way: there are a ton of extra iterations here
      let n = k - (mLength - m);
      if (n >= 0 && n < nLength) {
        currentDiagonal.push(array[m][n]);
      }
    }
    console.log(currentDiagonal);
  }
};

const printMatrixDiagonalsBetter = (matrix) => {
  const m = matrix.length - 1;
  for (let i = 0; i <= 2 * m; i++) {
    let k = i > m ? 2 * m - i : i;
    let curString = '';
    for (let j = 0; j <= k; j++) {
      const [x, y] = [j, m - k + j];
      curString += matrix[x][y];
    }
    console.log(curString);
  }
};

printMatrixDiagonalsBetter(test1);
