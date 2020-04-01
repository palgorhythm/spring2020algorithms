const { test } = require('../common/utils');

const xyToString = (x, y) => {
  return `${x},${y}`;
};
const numIslands = grid => {
  const visited = new Set();
  const explore = (x, y, grid) => {
    // visit the whole island
    if (
      visited.has(indexString) ||
      x < 0 ||
      y < 0 ||
      x >= grid.length ||
      y >= grid[0].length
    )
      return;

    visited.add(xyToString(x, y));

    recurse(x + 1, y, grid);
    recurse(x + 1, y, grid);
    recurse(x, y + 1, grid);
    recurse(x + 1, y, grid);
  };
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (!visited.has(xyToString(i, j))) {
        explore(i, j, grid);
      }
    }
  }
};

const testArr = [
  [
    [
      [1, 1, 1, 1, 0],
      [1, 1, 0, 1, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  ],
  [
    [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 0, 1, 1]
    ]
  ],
  [
    [
      [1, 0, 1, 1, 0],
      [1, 1, 0, 1, 0],
      [0, 1, 0, 1, 0],
      [0, 0, 0, 1, 1]
    ]
  ]
];
const expectedArr = [1, 3, 2];

test(numIslands, (a, b) => a === b, [testArr[1]], [expectedArr[1]]);
