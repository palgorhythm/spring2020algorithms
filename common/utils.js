const Node = require('./Node');

function test(f, compareFn, argumentArr, expectedArr, printFn = null) {
  let numTests = Math.min(argumentArr.length, expectedArr.length);
  console.log(`🐥🐥🐥🐥🐥🐥🐥🐥${f.name}🐥🐥🐥🐥🐥🐥🐥🐥`);
  for (let i = 0; i < numTests; i++) {
    let actual;
    console.log(`---------------[Test ${i}]----------------`);
    console.log(...argumentArr[i]);
    actual = f(...argumentArr[i]);
    const expected = expectedArr[i];
    const success = compareFn(actual, expected);
    const emoji = success === true ? '✅' : '❌';
    console.log(emoji, 'Actual:', printFn === null ? actual : printFn(actual));
    console.log(
      emoji,
      'Expect:',
      printFn === null ? expected : printFn(expected)
    );
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
