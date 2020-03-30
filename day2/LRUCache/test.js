const LRUCache = require('./LRUCache.js');
const LRUCacheRefactor = require('./LRUCacheRefactor.js');
const { DoublyLinkedList, LruNode } = require('./DoublyLinkedList.js');
const utils = require('../common/utils.js');

const a = new DoublyLinkedList();
const node1 = a.addToHead(new LruNode(1, 1));
const node2 = a.addToTail(new LruNode(2, 2));
const node3 = a.addToTail(new LruNode(3, 3));
const node0 = a.addToHead(new LruNode(0, 0));
a.remove(node3);
a.remove(node2);
a.remove(node0);
a.remove(node1);

// test original implementation
console.log('original implementation tests');
const lru = new LRUCache(3);
lru.put(1, 6);
lru.put(2, 4);
lru.put(3, 4);
utils.test([lru.get, lru], (a, b) => a == b, [[4]], [-1]);
utils.test([lru.get, lru], (a, b) => a == b, [[2]], [4]);
lru.put(4, 5);
lru.put(3, 7);
utils.test([lru.get, lru], (a, b) => a == b, [[2]], [4]);
utils.test([lru.get, lru], (a, b) => a == b, [[3]], [7]);
utils.test([lru.get, lru], (a, b) => a == b, [[1]], [-1]);

console.log('refactor tests');
const lruRefactor = new LRUCacheRefactor(3);
lruRefactor.put(1, 6);
lruRefactor.put(2, 4);
lruRefactor.put(3, 4);
utils.test([lruRefactor.get, lruRefactor], (a, b) => a == b, [[4]], [-1]);
utils.test([lruRefactor.get, lruRefactor], (a, b) => a == b, [[2]], [4]);
lruRefactor.put(4, 5);
lruRefactor.put(3, 7);
utils.test([lruRefactor.get, lruRefactor], (a, b) => a == b, [[2]], [4]);
utils.test([lruRefactor.get, lruRefactor], (a, b) => a == b, [[3]], [7]);
utils.test([lruRefactor.get, lruRefactor], (a, b) => a == b, [[1]], [-1]);
