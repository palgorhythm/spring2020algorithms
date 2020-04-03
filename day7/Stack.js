class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.items = null;
  }
  push(item) {
    if (this.items === null) {
      this.items = new Node(item);
    } else {
      const newNode = new Node(item);
      newNode.next = this.items; // create the link between new top and items
      this.items = newNode;
    }
  }
  pop() {
    if (this.items === null) {
      throw new Error('stack is empty :(');
    } else {
      const outputVal = this.items.val;
      this.items = this.items.next;
      return outputVal;
    }
  }
  reverse() {
    // 4n -> 3n <- 2c  1
    if (this.items === null) {
      return;
    }
    let curNode = this.items; // start at the top of the stack
    let nextNode = this.items.next;
    curNode.next = null;
    while (nextNode !== null) {
      let nextNextNode = null;
      if (nextNode.next !== null) {
        nextNextNode = nextNode.next;
      }
      console.log(
        curNode.val,
        nextNode.val,
        nextNextNode ? nextNextNode.val : null
      );
      nextNode.next = curNode;
      curNode = nextNode;
      nextNode = nextNextNode;
    }
    this.items = curNode;
  }
}

const stack = new Stack();
stack.push(4);
console.log(stack);
stack.push(3);
console.log(stack); // 3
stack.push(2); // 3 <- 2
console.log(stack);
stack.push(1); // 3 <- 2 <- 1
stack.reverse();
console.log('reversed stack:', stack);
console.log(stack);
console.log(stack.pop()); // 1
console.log(stack.pop()); // 2
console.log(stack.pop()); // 3
console.log(stack.pop()); // 4
stack.pop(); // should throw
