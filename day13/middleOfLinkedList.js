const {
  test,
  arrayToLinkedList,
  compareLinkedLists,
  linkedListToString,
} = require('../common/utils');
const Node = require('../common/utils');

const middleNode = (head) => {
  let numNodes = 0;
  let cur = head.next;
  while (cur !== null) {
    numNodes++;
    cur = cur.next;
  }
  cur = head;
  for (let i = 0; i < Math.ceil(numNodes / 2); i++) {
    cur = cur.next;
  }
  return cur;
};

const t1 = arrayToLinkedList([1, 2, 3, 4, 5]);
const t2 = arrayToLinkedList([1, 2, 3, 4, 5, 6]);
const testArr = [[t1], [t2]];
const expectedArr = [
  arrayToLinkedList([3, 4, 5]),
  arrayToLinkedList([4, 5, 6]),
];
test(middleNode, compareLinkedLists, testArr, expectedArr, linkedListToString);
