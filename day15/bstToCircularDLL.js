// https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/
const TreeNode = require('../common/TreeNode');
const { test } = require('../common/utils');

// O(n) time, O(n) space (space bc of call stack from recursion is at most depth of tree)

const treeToDoublyList = (root) => {
  if (root === null) {
    return null;
  }
  const fLeft = treeToDoublyList(root.left);
  const fRight = treeToDoublyList(root.right);
  let flattenedLeftHead = fLeft;
  let flattenedRightHead = fRight;
  if (fLeft === null) {
    flattenedLeftHead = root;
    flattenedLeftHead.right = flattenedLeftHead;
    flattenedLeftHead.left = flattenedLeftHead;
  }
  if (fRight === null) {
    flattenedRightHead = root;
    flattenedRightHead.right = flattenedRightHead;
    flattenedRightHead.left = flattenedRightHead;
  }

  const flattenedLeftTail = flattenedLeftHead.left;
  const flattenedRightTail = flattenedRightHead.left;
  if (fLeft !== null) {
    root.left = flattenedLeftTail;
    flattenedLeftTail.right = root;
    flattenedLeftHead.left = null;
  }
  if (fRight !== null) {
    root.right = flattenedRightHead;
    flattenedRightHead.left = root;
    flattenedRightTail.right = null;
  }

  flattenedLeftHead.left = flattenedRightTail;
  flattenedRightTail.right = flattenedLeftHead;

  return flattenedLeftHead;
};

const treeToDoublyListFancy = (r) => {
  let prev = null;

  const innerFunc = (root) => {
    if (root == null) return null;
    const dummy = new TreeNode(0);
    prev = dummy;
    helper(root);
    //connect head and tail
    prev.right = dummy.right;
    dummy.right.left = prev;
    return dummy.right;
  };

  const helper = (cur) => {
    if (cur == null) return;
    helper(cur.left);
    prev.right = cur;
    cur.left = prev;
    prev = cur;
    helper(cur.right);
  };

  return innerFunc(r);
};

const t1 = TreeNode.arrayToBstLevelOrder([4, 2, 5, 1, 3]);
const e1 = TreeNode.arrayToCircularDoublyLinkedList([1, 2, 3, 4, 5]);
// console.log(TreeNode.toString(e1.left));
// the above prints as 2 3 4 5 1 if we just print e1 as is
// bc goes all the way to left before reaching 1 again, so last thing it sees is 2 before coming back up.
const t2 = TreeNode.arrayToBstLevelOrder([2, 1, 3]);
const e2 = TreeNode.arrayToCircularDoublyLinkedList([1, 2, 3]);
const t3 = TreeNode.arrayToBstLevelOrder([]);
const e3 = TreeNode.arrayToCircularDoublyLinkedList([]);
const t4 = TreeNode.arrayToBstLevelOrder([1]);
const e4 = TreeNode.arrayToCircularDoublyLinkedList([1]);

const testArr = [[t1], [t2], [t3], [t4]];
const expectedArr = [e1, e2, e3, e4];
const compareFn = (a, b) => {
  if (!(a instanceof TreeNode)) {
    return a === b;
  } else {
    return TreeNode.toString(a.left) === TreeNode.toString(b.left);
  }
};
const printFn = (a) => {
  if (!(a instanceof TreeNode)) {
    return a;
  } else {
    return TreeNode.toString(a.left);
  }
};

// test(treeToDoublyList, compareFn, testArr, expectedArr, printFn);
test(treeToDoublyListFancy, compareFn, testArr, expectedArr, printFn);
