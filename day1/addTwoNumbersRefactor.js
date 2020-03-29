const { Node } = require('./utils.js');

module.exports = (a, b) => {
  return addTwoRecursive(a, b, 0);
};

const addTwoRecursive = (x, y, carry) => {
  if (x === null && y === null && carry === 0) {
    return null;
  }
  if (x === null && y === null && carry === 1) {
    return new Node(1);
  }
  let sum = carry;
  sum += x === null ? 0 : x.val;
  sum += y === null ? 0 : y.val;
  carry = Math.floor(sum / 10);
  const resultDigit = sum % 10;
  const curNode = new Node(resultDigit);
  curNode.next = addTwoRecursive(
    x === null ? null : x.next,
    y === null ? null : y.next,
    carry
  );
  return curNode;
};
