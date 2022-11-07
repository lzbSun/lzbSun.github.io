class CListNode {
  element: any;
  next: CListNode | null;
  constructor(element) {
    this.element = element;
    this.next = null;
  }
}

class CLinkedList {
  head: CListNode;

  constructor() {
    this.head = new CListNode("head");
  }
  findByValue(item) {
    let currentNode = this.head.next;
    while (currentNode !== null && currentNode.element !== item) {
      currentNode = currentNode.next;
    }
    return currentNode !== null ? currentNode : undefined;
  }

  findByIndex(pos) {
    let currentNode = this.head.next,
      index = 0;

    while (currentNode !== null && index !== pos) {
      currentNode = currentNode.next;
      pos++;
    }
    return currentNode !== null ? currentNode : undefined;
  }

  append(newElement) {
    const newNode = new CListNode(newElement);
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }
    currentNode.next = newNode;
  }

  insert(newElement, element) {
    let node = this.findByValue(element);
    if (!node) {
      console.log("Not found");
      return;
    }
    let newNode = new CListNode(newElement);
    newNode.next = node.next;
    node.next = newNode;
  }

  findPrev(item) {
    let currentNode = this.head;
    while (currentNode.next !== null && currentNode.next.element !== item) {
      currentNode = currentNode.next;
    }
    if (currentNode.next !== null) {
      return undefined;
    }
    return currentNode;
  }

  delete(item) {
    let node = this.findPrev(item);
    if (!node) {
      console.log("Not found");
      return undefined;
    }
    node.next = node.next!.next;
  }

  display() {
    let currentNode = this.head.next;
    while (currentNode) {
      console.log(currentNode.element);
      currentNode = currentNode.next;
    }
  }
  // 反转单链表
  reverseList() {
    let newNode = new CListNode("head");
    let currentNode = this.head as CListNode | null;

    while (currentNode) {
      let nextNode = currentNode.next;
      currentNode.next = newNode.next;
      newNode.next = currentNode;
      currentNode = nextNode;
    }
    this.head = newNode;
  }
  // 环检测
  circleCheck() {
    let fast = this.head.next;
    let slow = this.head as CListNode | null;

    while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow!.next;
      if (slow === fast) return true;
    }
    return false;
  }

  findMiddleNode() {
    let fast = this.head.next;
    let slow = this.head as CListNode | null;
    while (fast !== null && fast.next !== null) {
      fast = fast.next.next;
      slow = slow!.next;
    }
    return slow;
  }
}

const mergeSortedList = (listA: CListNode | null, listB: CListNode | null) => {
  if (!listA) {
    return listB;
  }
  if (!listB) {
    return listA;
  }

  let resultList: CListNode | null = null;

  if (listA.element < listB.element) {
    resultList = listA;
    listA = listA.next;
  } else {
    resultList = listB;
    listB = listB.next;
  }
  let currentNode = resultList;
  while (listA !== null && listB !== null) {
    if (listA.element < listB.element) {
      currentNode.next = listA;
      listA = listA.next;
    } else {
      currentNode.next = listB;
      listB = listB.next;
    }
    currentNode = currentNode.next;
  }
  if (listA) {
    currentNode.next = listA;
  }
  if (listB) {
    currentNode.next = listB;
  }

  return resultList;
};
