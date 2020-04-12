class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }

  static printInOrder = (root) => {
    if (root === null) {
      return;
    } else {
      root.left !== null ? TreeNode.printInOrder(root.left) : null;
      console.log(root.val);
      root.right !== null ? TreeNode.printInOrder(root.right) : null;
    }
  };

  static print = (root) => {
    let s = '';
    const stack = [root];
    let curPowerOf2 = 0;
    let numLeft = Math.pow(2, curPowerOf2);
    while (stack.length > 0) {
      if (stack.every((el) => el === null)) {
        return;
      }
      const cur = stack.shift();
      const numRepeats = parseInt(Math.pow(2, 3 - curPowerOf2));
      if (cur === null) {
        s += '  '.repeat(numRepeats).repeat(2);
        stack.push(null);
        stack.push(null);
        numLeft--;
        continue;
      }
      s += '  '.repeat(numRepeats) + cur.val + '  '.repeat(numRepeats);
      stack.push(cur.left);
      stack.push(cur.right);
      numLeft--;
      if (numLeft === 0) {
        // it's a power of 2
        console.log(s);
        s = '';
        curPowerOf2++;
        numLeft = Math.pow(2, curPowerOf2);
      }
    }
    console.log(s);
  };

  static arrayToBstLevelOrder = (arr) => {
    // ex: [4, 2, 5, 1, 3, null, null]
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i] === null ? null : new TreeNode(arr[i]);
    }
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] !== null) {
        arr[i].left = arr[2 * i + 1] !== undefined ? arr[2 * i + 1] : null;
        arr[i].right = arr[2 * i + 2] !== undefined ? arr[2 * i + 2] : null;
      }
    }

    return arr[0];
  };
}

const test = () => {
  const t1 = TreeNode.arrayToBstLevelOrder([5, 2, 7, 1, 3, 6, 8]);
  TreeNode.printInOrder(t1);
  console.log('teeee');
  TreeNode.print(t1);
  console.log('-----------------');
  const t2 = TreeNode.arrayToBstLevelOrder([
    4,
    2,
    5,
    1,
    3,
    null,
    10,
    0,
    null,
    null,
    null,
    null,
    null,
    9,
    12,
  ]);
  TreeNode.print(t2);
};
test();
module.exports = TreeNode;
