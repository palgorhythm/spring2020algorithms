function Node(val) {
  this.val = val;
  this.next = null;
}

Node.fromArray = (arr) => {
  if (arr.length === 0) {
    return null;
  }
  const head = new Node(arr[0]);
  let curNode = head;
  for (let i = 1; i < arr.length; i++) {
    curNode.next = new Node(arr[i]);
    curNode = curNode.next;
  }
  return head;
};

module.exports = Node;
