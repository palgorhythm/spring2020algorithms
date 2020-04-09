const {
  test,
  compareLinkedLists,
  linkedListToString,
} = require('../common/utils');
const Node = require('../common/Node');
// adapted from https://leetcode.com/problems/merge-k-sorted-lists/discuss/114606/Extremely-simple-JavaScript-Solution

const merge = (left, right) => {
  if (!left) {
    return right;
  } else if (!right) {
    return left;
  } else if (left.val < right.val) {
    left.next = merge(left.next, right);
    return left;
  } else {
    right.next = merge(left, right.next);
    return right;
  }
};

const helper = (lists, start, end) => {
  console.log(start, end);
  if (start === end) {
    // if there's now only one LL in lists
    return lists[start];
  } else if (start < end) {
    const mid = parseInt((start + end) / 2); // find the midpoint of the indices (this takes the floor)
    const left = helper(lists, start, mid); // run this process on the left half
    const right = helper(lists, mid + 1, end); // run this process on the right half
    // once the execution reaches this point, left and right are single LLs.
    return merge(left, right); // recursive merge for two LLs.
  } else {
    return null;
  }
};

const mergeKLists = (lists) => {
  return helper(lists, 0, lists.length - 1); // divide and conquer
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
