function Node(val) {
  this.val = val;
  this.next = null;
}

function linkedListToString(node) {
  let outputString = '';
  let cur = node;
  while (cur !== null) {
    outputString += cur.val;
    cur = cur.next;
  }
  return outputString;
}

function logResults(expected, actual) {
  const actualToString = linkedListToString(actual);
  const expectedToString = linkedListToString(expected);
  console.log(
    'expected:',
    expectedToString,
    'actual:',
    actualToString,
    'success:',
    actualToString === expectedToString
  );
}

module.exports = { Node, linkedListToString, logResults };
