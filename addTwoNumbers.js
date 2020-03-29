function Node(val) {
  this.val = val;
  this.next = null;
}

function printLinkedList(node) {
  let cur = node;
  while (cur !== null) {
    console.log(cur.val);
    cur = cur.next;
  }
}

const a = new Node(2);
a.next = new Node(4);
a.next.next = new Node(3);

const b = new Node(5);
b.next = new Node(6);
b.next.next = new Node(4);

const expected = new Node(7);
expected.next = new Node(0);
expected.next.next = new Node(8);

const addTwoNumbers = (a, b) => {
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

const result = addTwoNumbers(a, b);
printLinkedList(result);

const addTwoNumbersBetter = (a, b) => {
  return addTwoRecur(a, b, 0);
};

const addTwoRecur = (x, y, carry) => {
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
  curNode.next = addTwoRecur(
    x === null ? null : x.next,
    y === null ? null : y.next,
    carry
  );
  return curNode;
};
const result2 = addTwoNumbersBetter(a, b);
printLinkedList(result2);
