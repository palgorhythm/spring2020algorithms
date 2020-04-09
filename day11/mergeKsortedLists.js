const {
  test,
  compareLinkedLists,
  linkedListToString,
} = require('../common/utils');
const Node = require('../common/Node');

const mergeKLists = (lists) => {
  // O(n^2 log n) approach where n is max(k, max linked list size)
  // sort lists by head of each arr
  // pop off head of first one, then rinse and repeat.
  if (lists.length === 0) {
    return null;
  }
  const outLL = [];
  let done = false;
  while (!done) {
    lists = lists.sort((a, b) => {
      if (a === null && b === null) {
        return 0;
      } else if (a === null) {
        return 1;
      } else if (b === null) {
        return -1;
      }
      if (a.val < b.val) {
        return -1;
      } else if (a.val > b.val) {
        return 1;
      } else {
        return 0;
      }
    });
    if (lists[0] === null) {
      done = true;
    } else {
      outLL.push(lists[0].val);
      lists[0] = lists[0].next;
    }
  }
  return Node.fromArray(outLL);
};

const t1 = [
  Node.fromArray([1, 4, 5]),
  Node.fromArray([1, 3, 4]),
  Node.fromArray([2, 6]),
];
const e1 = Node.fromArray([1, 1, 2, 3, 4, 4, 5, 6]);
const testArr = [[t1], [[]], [[null]]];
const expectedArr = [e1, null, null];
test(mergeKLists, compareLinkedLists, testArr, expectedArr, linkedListToString);
