// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

const flatten = (root) => {
  if (root === null) {
    return null;
  } else {
    const leftFlattened = flatten(root.left);
    const rightFlattened = flatten(root.right);
    const leftTail = findTail(leftFlattened);
    if (leftTail !== null) {
      leftTail.right = rightFlattened;
      root.right = leftFlattened;
    } else {
      root.right = rightFlattened;
    }
    root.left = null;
    return root;
  }
};

const findTail = (root) => {
  if (root === null) {
    return null;
  }
  let curNode = root;
  while (curNode.right !== null) {
    curNode = curNode.right;
  }
  return curNode;
};

const test = new TreeNode(1);
test.left = new TreeNode(2);
test.right = new TreeNode(5);
test.right.right = new TreeNode(6);
test.left.left = new TreeNode(3);
test.left.right = new TreeNode(4);

console.log(flatten(test));
