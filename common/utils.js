const Node = require('./Node');

function test(f, compareFn, argumentArr, expectedArr, printFn = null) {
  if (expectedArr.length !== argumentArr.length) {
    console.log('must supply same number of expected and actual results!');
  }
  for (let i = 0; i < expectedArr.length; i++) {
    let actual;
    actual = f(...argumentArr[i]);
    const expected = expectedArr[i];
    const success = compareFn(actual, expected);
    const emoji = success === true ? '✅' : '❌';
    console.log(`${emoji}---------------[Test ${i}]----------------${emoji}`);
    console.log('Actual:', printFn === null ? actual : printFn(actual));
    console.log('Expect:', printFn === null ? expected : printFn(expected));
  }
}

function compareLinkedLists(a, b) {
  if (!(a instanceof Node) || !(b instanceof Node)) {
    return a === b;
  }
  return linkedListToString(a) === linkedListToString(b);
}

function linkedListToString(node) {
  if (!(node instanceof Node)) {
    return null;
  }
  let outputString = '';
  let cur = node;
  while (cur !== null) {
    if (outputString !== '') {
      outputString += ' -> ';
    }
    outputString += cur.val;
    cur = cur.next;
  }
  return outputString;
}

const compareNestedArrays = (nestingLevel) => (a, b) => {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    return a === b;
  }
  const aFlat = a.flat(nestingLevel);
  const bFlat = b.flat(nestingLevel);
  return aFlat.every((el, index) => {
    return el === bFlat[index];
  });
};

function printLinkedList(linkedList) {
  if (!(linkedList instanceof Node)) {
    return null;
  }
  const stringifiedLL = linkedListToString(linkedList.head);
  console.log(stringifiedLL);
}

function lruCacheToString(lruCache) {
  let outputString = '';
  let cur = lruCache.dll.head;
  while (cur !== null) {
    outputString += '(' + cur.key + '-' + cur.val + ')';
    cur = cur.next;
  }
  return outputString;
}

function printLruCache(lruCache) {
  const outputString = lruCacheToString(lruCache);
  console.log(outputString);
}

function arrayToLinkedList(arr) {
  const dummy = new Node();
  let cur = dummy;
  for (let i = 0; i < arr.length; i++) {
    cur.next = new Node(arr[i]);
    cur = cur.next;
  }
  return dummy.next;
}

module.exports = {
  test,
  compareLinkedLists,
  linkedListToString,
  printLinkedList,
  lruCacheToString,
  printLruCache,
  compareNestedArrays,
  arrayToLinkedList,
};
