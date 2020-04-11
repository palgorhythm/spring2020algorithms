// https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/529/week-2/3293/
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * @param {TreeNode} root
 * @return {number}
 */
const diameterOfBinaryTree = (r) => {
  let globalMax = 0;
  const recurse = (root) => {
    if (root === null) {
      return 0;
    } else {
      const diamLeft = recurse(root.left);
      const diamRight = recurse(root.right);
      const diamWithThisNodeAsRoot = diamLeft + diamRight;
      if (diamWithThisNodeAsRoot > globalMax) {
        globalMax = diamWithThisNodeAsRoot;
      }
      return Math.max(diamLeft + 1, diamRight + 1);
    }
  };
  recurse(r);
  return globalMax;
};

const test = new TreeNode(1);
test.left = new TreeNode(2);
test.right = new TreeNode(3);
test.left.left = new TreeNode(4);
test.left.right = new TreeNode(5);

console.log(diameterOfBinaryTree(test));
