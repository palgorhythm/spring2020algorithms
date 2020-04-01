function test(f, compareFn, argumentArr, expectedArr) {
  console.log('---------------TEST----------------');
  if (expectedArr.length !== argumentArr.length) {
    console.log('must supply same number of expected and actual results!');
  }
  for (let i = 0; i < expectedArr.length; i++) {
    let actual;
    actual = f(...argumentArr[i]);
    const expected = expectedArr[i];
    const result = compareFn(actual, expected);
    let fancyHeader;
    let fancyResult;
    if (result === true) {
      fancyHeader = '✅';
      fancyResult = '✅';
    } else {
      fancyHeader = '❌';
      fancyResult = '❌';
    }
    console.log(
      fancyHeader,
      `[Test ${i}]`,
      'Actual:',
      actual,
      'Expected:',
      expected,
      fancyResult
    );
  }
}

function compareLinkedLists(a, b) {
  return linkedListToString(a) === linkedListToString(b);
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

function printLinkedList(linkedList) {
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

module.exports = {
  test,
  compareLinkedLists,
  linkedListToString,
  printLinkedList,
  lruCacheToString,
  printLruCache
};
