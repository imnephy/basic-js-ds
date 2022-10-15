const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor() {
    this.rootNode = null
  }

  root() {
    if (this.rootNode) {
      return this.rootNode
    } else {
      return null
    }
  }

  add(data) {
    let newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode
    } else {
      this.addNode(this.rootNode, newNode);
    }
  }
  addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.addNode(node.right, newNode)
      }
    }
  }

  has(data) {
    return hasNode(this.rootNode, data)

    function hasNode(node, data) {
      if (!node) {
        return false
      }

      if (node.data === data) {
        return true
      } else {
        if (data < node.data) {
          return hasNode(node.left, data)
        } else {
          return hasNode(node.right, data)
        }
      }
    }
  }

  find(data) {
    return findNode(this.rootNode, data)

    function findNode(node, data) {
      if (!node) {
        return null
      }

      if (node.data === data) {
        return node
      } else {
        if (data < node.data) {
          return findNode(node.left, data)
        } else {
          return findNode(node.right, data)
        }
      }
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, data) {
      if (!node) {
        return null
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data)
        return node
      } else if (data > node.data) {
        node.right = removeNode(node.right, data)
        return node
      } else {

        if (!node.left && !node.right) {
          return null;
        }

        if (!node.left) {
          node = node.right
          return node
        } 
        
        if (!node.right) {
          node = node.left
          return node
        }
        
        let minFromRight = node.right;
        while (minFromRight.left){
          minFromRight = minFromRight.left
        }
        node.data = minFromRight.data

        node.right = removeNode(node.right, minFromRight.data)

        return node
      }
    }
  }

  min() {
    return findMin(this.rootNode)

    function findMin(node){
      if (node.left){
        return findMin(node.left)
      }
      return node.data
    }
  }

  max() {
    return findMax(this.rootNode)

    function findMax(node){
      if (node.right){
        return findMax(node.right)
      }
      return node.data
    }
  }
}

module.exports = {
  BinarySearchTree
};