class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToHead(node) {
    if (this.head !== null) {
      const secondNode = this.head;
      secondNode.prev = node;
      node.next = secondNode;
      this.head = node;
      this.head.prev = null;
    } else if (this.tail === null) {
      // neither exist
      this.tail = node;
      this.head = node;
    }
    return node;
  }

  addToTail(node) {
    if (this.tail !== null) {
      const secondToLast = this.tail;
      secondToLast.next = node;
      node.prev = secondToLast;
      this.tail = node;
      this.tail.next = null;
    } else if (this.head === null) {
      // neither exist
      this.tail = node;
      this.head = node;
    }
    return node;
  }

  remove(node) {
    const nodeCopy = node;
    if (node.prev === null && node.next === null) {
      // handle last node
      this.head = null;
      this.tail = null;

      return nodeCopy;
    }

    if (node.prev === null) {
      // it's the head
      this.head = node.next;
      this.head.prev = null;
    }

    if (node.next === null) {
      // it's the tail
      this.tail = node.prev;
      this.tail.next = null;
    }

    if (node.next !== null && node.prev !== null) {
      node.prev.next = node.next;
      node.next.prev = node.prev;
    }

    return nodeCopy;
  }
}

class LruNode {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

module.exports = { DoublyLinkedList, LruNode };
