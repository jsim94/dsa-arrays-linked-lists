/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** private: #checkEmpty(): throws error if list is empty*/

  #checkEmpty() {
    if (this.length === 0) {
      throw new Error(`LinkedList is empty`);
    }
  }
  /** private: #checkIndex(idx): throws error if index does not exist */

  #checkIndex(idx) {
    if (idx > this.length - 1) {
      throw new Error(
        `Invalid Index. List length: ${this.length}. Passed index: ${idx}`
      );
    }
  }

  /** private: #getNode(idx): get node at index along with previous node. */

  #getNode(idx) {
    let prevNode = null;
    let node = this.head;
    let i = 0;

    for (i; i < idx; i++) {
      prevNode = node;
      node = node.next;
    }

    return { prevNode, node, index: i };
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val);
    if (this.head) {
      this.tail.next = newNode;
    } else {
      this.head = newNode;
    }
    this.tail = newNode;
    this.length++;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val);
    if (this.head) {
      newNode.next = this.head;
    } else {
      this.tail = newNode;
    }
    this.head = newNode;
    this.length++;
  }

  /** pop(): return & remove last item. */

  pop() {
    this.#checkEmpty();
    return this.removeAt(this.length - 1);
  }

  /** shift(): return & remove first item. */

  shift() {
    this.#checkEmpty();
    return this.removeAt(0);
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    const { node } = this.#getNode(idx);
    return node.val;
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    const { node } = this.#getNode(idx);
    node.val = val;
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    const newNode = new Node(val);

    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.length++;
      return;
    }

    const { prevNode, node } = this.#getNode(idx);

    prevNode.next = newNode;
    newNode.next = node;

    if (idx === this.length) this.tail = newNode;

    this.length++;
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    const { prevNode, node, index } = this.#getNode(idx);

    this.length--;

    if (this.length === 0) {
      (this.head = null), (this.tail = null);
    } else if (idx === 0) {
      this.head = node.next;
    }

    if (idx === this.length) this.tail = prevNode;

    return node.val;
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0;

    let sum = 0;
    let i = 0;
    let currNode = this.head;

    for (i; i < this.length; i++) {
      sum += currNode.val;
      currNode = currNode.next;
    }
    return sum / i;
  }

  /** reverse(): reverses the list in place*/

  reverse() {
    const newHead = this.tail;
    let currNode = this.head;
    let nextNode = currNode.next;

    this.tail = currNode;
    currNode.next = null;

    while (currNode !== newHead) {
      let newNext = nextNode.next;
      nextNode.next = currNode;
      currNode = nextNode;
      nextNode = newNext;
    }

    this.head = currNode;

    debugger;
  }
}

module.exports = LinkedList;
