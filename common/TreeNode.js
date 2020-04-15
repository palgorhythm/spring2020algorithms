class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }

  static toString = (r) => {
    let outString = '';
    const visited = new Set();
    const recurse = (root) => {
      if (root === null || visited.has(root.val)) {
        return '';
      } else {
        visited.add(root.val);
        root.left !== null ? recurse(root.left) : '';
        outString += (outString === '' ? '' : '=>') + root.val.toString();
        root.right !== null ? recurse(root.right) : '';
      }
    };
    recurse(r, new Set());
    return outString;
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
    if (arr.length === 0) {
      return null;
    }
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

  static arrayToCircularDoublyLinkedList = (arr) => {
    if (arr.length === 0) {
      return null;
    }
    let curNode = new TreeNode();
    const dummy = curNode;
    for (let i = 0; i < arr.length; i++) {
      const newNode = new TreeNode(arr[i]);
      curNode.right = newNode;
      newNode.left = curNode;
      curNode = newNode;
    }
    const head = dummy.right;
    head.left = curNode;
    curNode.right = head;
    return head;
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

module.exports = TreeNode;
