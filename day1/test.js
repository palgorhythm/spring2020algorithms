const Node = require('../common/Node.js');
const addTwoNumbers = require('./addTwoNumbers');
const addTwoNumbersRefactor = require('./addTwoNumbersRefactor.js');

const utils = require('../common/utils.js');

const a = new Node(2);
a.next = new Node(4);
a.next.next = new Node(3);

const b = new Node(5);
b.next = new Node(6);
b.next.next = new Node(4);

const expected = new Node(7);
expected.next = new Node(0);
expected.next.next = new Node(8);

// test original implementation
utils.test(
  [addTwoNumbers, null],
  utils.compareLinkedLists,
  [[a, b]],
  [expected]
);

// test refactor
utils.test(
  [addTwoNumbersRefactor, null],
  utils.compareLinkedLists,
  [[a, b]],
  [expected]
);
