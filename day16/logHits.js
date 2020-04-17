// www.pets2.com
// https://www.geeksforgeeks.org/design-a-hit-counter/

let time = 0;
const getTimestamp = () => {
  const goToNextSecond = Math.round(Math.random()) === 1;
  if (goToNextSecond) {
    time++;
  }
  return time;
};

class Node {
  constructor(val) {
    this.timestamp = val;
    this.count = 1;
    this.next = this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = this.tail = null;
    this.size = 0;
  }
  addToTail(val) {
    const newNode = new Node(val);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.size++;
  }
  removeHead() {
    if (this.head !== null) {
      const newHead = this.head.next;
      this.head = newHead;
      if (newHead !== null) {
        newHead.prev = null;
      } else if (this.tail !== null) {
        // if head is null but tail isn't, it means we need to clean up the tail.
        this.tail = null;
      }
      this.size--;
    }
  }
}
// get numHits in the last minute.
class Logger {
  constructor(numMinutes) {
    this.visits = new DoublyLinkedList();
    this.numMinutes = numMinutes;
  }

  logHit() {
    const now = getTimestamp();
    if (this.visits.tail !== null && this.visits.tail.timestamp === now) {
      this.visits.tail.count++;
    } else {
      this.visits.addToTail(now);
      this.removeExpiredLogs(now);
    }
  }

  removeExpiredLogs(now) {
    while (this.visits.head.timestamp < now - 60 * this.numMinutes) {
      this.visits.removeHead();
    }
  }

  getNumHits() {
    let numHits = 0;
    let curNode = this.visits.tail;
    while (curNode !== null) {
      numHits += curNode.count;
      curNode = curNode.prev;
    }
    return numHits;
  }
}

const test = () => {
  const logger = new Logger(1);
  for (let i = 0; i < 10000; i++) {
    logger.logHit();
  }

  console.log(logger.getNumHits());
};

test();
