const Node = require('../common/Node.js');

module.exports = (a, b) => {
  let outputLength = 0;
  const output = new Node(0);
  let curOutputNode = output;
  let aCur = a;
  let bCur = b;
  let carryOver = 0;
  let resultDigit;
  let aCurValue;
  let bCurValue;
  while (aCur !== null || bCur !== null || carryOver !== 0) {
    if (aCur !== null) {
      aCurValue = aCur.val;
    } else {
      aCurValue = 0;
    }
    if (bCur !== null) {
      bCurValue = bCur.val;
    } else {
      bCurValue = 0;
    }
    const curValue = aCurValue + bCurValue + carryOver;
    carryOver = 0;
    if (curValue > 9) {
      resultDigit = curValue - 10;
      carryOver = 1;
    } else {
      resultDigit = curValue;
    }
    if (outputLength === 0) {
      curOutputNode.val = resultDigit;
    } else {
      curOutputNode.next = new Node(resultDigit);
      curOutputNode = curOutputNode.next;
    }
    if (aCur !== null) {
      aCur = aCur.next;
    }
    if (bCur !== null) {
      bCur = bCur.next;
    }
    outputLength++;
  }
  return output;
};
