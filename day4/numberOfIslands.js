const { test } = require('../common/utils');

// Input:
// 11110
// 11010
// 11000
// 00000

// Output: 1

// 11000
// 11000
// 00100
// 00011

// Output: 3

const xyToString = (x, y) => {
  return `${x},${y}`;
};

const numIslands = grid => {
  if (grid.length === 0 || grid[0].length === 0) return 0;
  const visited = {};
  const waterArr = [];
  const islandArr = [];
  let stopRecursion = false;
  const recurse = (x, y, onAnIsland, stop) => {
    const indexString = xyToString(x, y);
    console.log(indexString, stopRecursion, onAnIsland);
    if (
      visited.hasOwnProperty(indexString) ||
      x < 0 ||
      y < 0 ||
      x >= grid.length ||
      y >= grid[0].length ||
      stop
    )
      return;
    // console.log(x, y);
    const value = grid[x][y];
    visited[indexString] = value;
    if (onAnIsland == !value) {
      // if we're looking for an island but the value is 0, recurse on isLookingForI
      // recurse(x, y, !onAnIsland); // search for the next island
      if (value === 0) {
        waterArr.push([x, y]);
      } else {
        islandArr.push([x, y]);
        stopRecursion = true;
      }
      return;
    } else {
      recurse(x + 1, y, onAnIsland, stopRecursion);
      recurse(x + 1, y, onAnIsland, stopRecursion);
      recurse(x, y + 1, onAnIsland, stopRecursion);
      recurse(x + 1, y, onAnIsland, stopRecursion);
    }
  };
  let i = 0;
  let j = 0;
  let islandCount = 0;
  if (grid[0][0] === 1) {
    islandArr.push([0, 0]);
  } else {
    waterArr.push([0, 0]);
  }
  let done = false;
  while (!done) {
    console.log('switching to island', visited, islandArr);
    islandArr.forEach(island => {
      // reopen all the islands
      const [islandX, islandY] = island;
      const str = xyToString(islandX, islandY);
      delete visited[str]; // so we can explore from here
    });
    while (islandArr.length > 0) {
      const [islandX, islandY] = islandArr.pop();
      recurse(islandX, islandY, true);
    }
    islandCount++;
    console.log('switching to water', visited, waterArr);
    waterArr.forEach(water => {
      // reopen all the waters
      const [waterX, waterY] = water;
      const str = xyToString(waterX, waterY);
      delete visited[str]; // so we can explore from here
    });
    while (waterArr.length > 0) {
      const [waterX, waterY] = waterArr.pop();
      // console.log('water', str, visited, waterArr, islandArr);
      stopRecursion = false;
      recurse(waterX, waterY, false);
    }
    if (islandArr.length === 0) {
      done = true;
    }
  }

  return islandCount;
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
