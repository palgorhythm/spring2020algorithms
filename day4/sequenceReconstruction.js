const { test } = require('../common/utils');

const sequenceReconstruction = (org, seqs) => {
  if (seqs.length === 0) return false;
  const graph = {};
  const indegrees = {};
  let allSeqsEmpty = true;

  org.forEach(el => {
    graph[el] = new Set();
    indegrees[el] = 0;
  });

  for (let i = 0; i < seqs.length; i++) {
    const seq = seqs[i];
    if (seq.length !== 0) {
      allSeqsEmpty = false;
    }
    if (seq.length === 1 && !graph.hasOwnProperty(seq[0])) {
      return false; // if this sequence can't be used to build the org
    }
    for (let j = 0; j < seq.length - 1; j++) {
      if (!graph.hasOwnProperty(seq[j]) || !graph.hasOwnProperty(seq[j + 1])) {
        return false; // same condition as above
      }
      if (!graph[seq[j]].has(seq[j + 1])) {
        // if we've already added this edge
        graph[seq[j]].add(seq[j + 1]);
        indegrees[seq[j + 1]]++;
      }
    }
  }
  if (allSeqsEmpty) {
    return false;
  }
  const sourceKeys = Object.keys(graph).filter(key => {
    return indegrees[key] === 0;
  });
  const sorted = [];
  if (sourceKeys.length === 0) return false; // there are no sources
  while (sourceKeys.length > 0) {
    if (sourceKeys.length > 1) {
      // there is more than one unique topological sort
      return false;
    }
    const curKey = sourceKeys.pop();

    for (let child of graph[curKey]) {
      indegrees[child]--;
      if (indegrees[child] === 0) {
        sourceKeys.push(child);
      }
    }
    sorted.push(parseInt(curKey));
    const i = sorted.length - 1;
    if (sorted[i] !== org[i]) {
      // the topological sort does not match the org sequence
      return false;
    }
  }

  const indegreesKeys = Object.keys(indegrees);
  for (let i = 0; i < indegreesKeys.length; i++) {
    // if there's a cycle
    if (indegrees[indegreesKeys[i]] !== 0) {
      return false;
    }
  }
  return true;
};

const testArr = [
  [
    // 0
    [1, 2, 3],
    [
      [1, 2],
      [1, 3]
    ]
  ],
  [[1, 2, 3], [[1, 2]]], // 1
  [
    // 2
    [1, 2, 3],
    [
      [1, 2],
      [1, 3],
      [2, 3]
    ]
  ],
  [
    // 3
    [4, 1, 5, 2, 6, 3],
    [
      [5, 2, 6, 3],
      [4, 1, 5, 2]
    ]
  ],
  [[1], []], // 4
  [[1], [[], []]], // 5
  [[1], [[1, 1]]], // 6
  [[1], [[1], [1], [1]]], // 7
  [
    // 8
    [1, 2, 3, 4],
    [
      [1, 2, 3],
      [3, 4],
      [4, 3]
    ]
  ],
  [
    // 9
    [3, 7, 6, 4, 8, 2, 10, 1, 5, 9],
    [
      [7, 6, 4, 8, 2, 10, 1, 5, 9],
      [4, 8, 2, 10, 1, 5],
      [2, 10, 1, 5],
      [10, 1, 5, 9],
      [1, 5, 9],
      [8, 2, 10, 1, 5, 9],
      [9],
      [],
      [6, 4],
      [3, 7, 6, 4, 8, 2, 10, 1]
    ]
  ],
  [
    [5, 3, 2, 4, 1],
    [[5, 3, 2, 4], [4, 1], [1], [3], [2, 4], [1000000000]]
  ]
];

const expectedArr = [
  false,
  false,
  true,
  true,
  false,
  false,
  false,
  true,
  false,
  true,
  false
];

test(sequenceReconstruction, (a, b) => a === b, testArr, expectedArr);
