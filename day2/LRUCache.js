const { DoublyLinkedList, LruNode } = require('./DoublyLinkedList.js');

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.dll = new DoublyLinkedList();
  }
  put(key, value) {
    let nodeToMoveToHead;
    if (this.cache.hasOwnProperty(key)) {
      // if it's already in the cache
      nodeToMoveToHead = this.cache[key];
      this.dll.remove(nodeToMoveToHead);
      nodeToMoveToHead.val = value;
    } else if (Object.keys(this.cache).length === this.capacity) {
      // if cache is max size
      delete this.cache[this.dll.tail.key];
      this.dll.remove(this.dll.tail);
      nodeToMoveToHead = new LruNode(key, value);
    } else {
      nodeToMoveToHead = new LruNode(key, value);
    }
    this.cache[key] = nodeToMoveToHead;
    this.dll.addToHead(nodeToMoveToHead);
  }

  get(key) {
    if (this.cache.hasOwnProperty(key)) {
      const valueNode = this.cache[key];
      const nodeToMoveToHead = this.dll.remove(valueNode);
      this.dll.addToHead(nodeToMoveToHead);
      return valueNode.val;
    } else {
      return -1;
    }
  }
}

module.exports = LRUCache;
