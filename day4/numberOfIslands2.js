const { test } = require('../common/utils');

const isInBounds = (i, j, grid) => {
  return i >= 0 && j >= 0 && i < grid.length && j < grid[0].length;
};
const numIslands = grid => {
  const explore = (i, j) => {
    if (isInBounds(i, j, grid) && grid[i][j] == '1') {
      grid[i][j] = '0'; // if the current position is a 1 and within bounds,
      explore(i + 1, j); // explore the 4 adjacent positions (up, down, left, right)
      explore(i - 1, j);
      explore(i, j + 1);
      explore(i, j - 1);
    }
  };
  let numberOfIslands = 0;
  grid.forEach((row, i) => {
    // look at every entry in the grid
    row.forEach((_, j) => {
      if (grid[i][j] === '1') {
        // if we find land, explore it
        explore(i, j);
        numberOfIslands++;
      }
    });
  });
  return numberOfIslands;
};

const testArr = [
  [
    [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0']
    ]
  ],
  [
    [
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1']
    ]
  ],
  [
    [
      ['1', '0', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['0', '1', '0', '1', '0'],
      ['0', '0', '0', '1', '1']
    ]
  ],
  [
    [
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0']
    ]
  ],
  [
    [
      ['1', '1', '1'],
      ['0', '1', '0'],
      ['1', '1', '1']
    ]
  ]
];
const expectedArr = [1, 3, 2, 1, 1];

test(numIslands, (a, b) => a === b, testArr, expectedArr);
