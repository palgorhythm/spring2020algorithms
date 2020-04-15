const { test } = require('../common/utils');

const findFirstDifferentCharacterIndex = (a, b) => {
  const maxLength = Math.max(a.length, b.length);
  for (let i = 0; i < maxLength; i++) {
    if (a[i] !== b[i]) {
      if (i >= a.length) {
        return -1;
      } else {
        return i;
      }
    }
  }
  return -1;
};

const createGraphNodes = (words) => {
  const letters = new Set();
  const graph = {};
  const indegrees = {};
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      letters.add(words[i][j]);
    }
  }
  letters.forEach((letter) => {
    graph[letter] = new Set();
    indegrees[letter] = 0;
  });
  return [graph, indegrees];
};

const setGraphDependencies = (words, graph, indegrees) => {
  for (let i = 0; i < words.length - 1; i++) {
    const firstDifferentCharacterIndex = findFirstDifferentCharacterIndex(
      words[i],
      words[i + 1]
    );
    if (firstDifferentCharacterIndex === -1) {
      continue;
    } else if (firstDifferentCharacterIndex >= words[i + 1].length) {
      // if they're the same except a has more letters than b,
      // like abc vs ab
      return false;
    }
    const dependency = words[i][firstDifferentCharacterIndex];
    const cur = words[i + 1][firstDifferentCharacterIndex];
    if (!graph[dependency].has(cur)) {
      graph[dependency].add(cur);
      indegrees[cur]++;
    }
  }
  return true;
};

const findGraphSources = (graph, indegrees) => {
  const keys = Object.keys(graph);
  return keys.filter((key) => {
    return indegrees[key] === 0;
  });
};

const doesGraphHaveCycle = (indegrees) => {
  const indegreesKeys = Object.keys(indegrees);
  for (let i = 0; i < indegreesKeys.length; i++) {
    // if there's a cycle
    if (indegrees[indegreesKeys[i]] !== 0) {
      return true;
    }
  }
  return false;
};

const topologicalSort = (graph, indegrees) => {
  const sources = findGraphSources(graph, indegrees);
  const sorted = [];
  const visited = new Set();
  while (sources.length > 0) {
    const curSource = sources.pop();
    const children = graph[curSource] || [];
    for (let child of children) {
      if (visited.has(child)) {
        return [];
      }
      indegrees[child]--;
      if (indegrees[child] === 0) {
        sources.push(child);
      }
    }
    visited.add(curSource);
    sorted.push(curSource);
  }

  if (doesGraphHaveCycle(indegrees)) {
    return [];
  }

  return sorted;
};

const alienOrder = (words) => {
  const [graph, indegrees] = createGraphNodes(words);
  const depsWereSet = setGraphDependencies(words, graph, indegrees);
  if (!depsWereSet) {
    return '';
  }
  return topologicalSort(graph, indegrees).join('');
};
const t1 = ['wrt', 'wrf', 'er', 'ett', 'rftt'];
const e1 = 'wertf';

const t2 = ['z', 'x'];
const e2 = 'zx';

const t3 = ['z', 'x', 'z'];
const e3 = '';

const t4 = ['z', 'z'];
const e4 = 'z';

const t5 = ['za', 'zb', 'ca', 'cb'];
const e5 = 'abzc';

const t6 = ['abc', 'ab'];
const e6 = '';

const t7 = ['wrt', 'wrtkj'];
const e7 = 'jktrw';

const t8 = [
  'ri',
  'xz',
  'qxf',
  'jhsguaw',
  'dztqrbwbm',
  'dhdqfb',
  'jdv',
  'fcgfsilnb',
  'ooby',
];
const e8 = '';

const testArr = [[t1], [t2], [t3], [t4], [t5], [t6], [t7], [t8]];
const expectedArr = [e1, e2, e3, e4, e5, e6, e7, e8];

test(alienOrder, (a, b) => a === b, testArr, expectedArr);
