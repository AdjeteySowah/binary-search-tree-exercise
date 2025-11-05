function createNode(value) {
  return { value, left: null, right: null };
}

function createTree(array) {
  let root = buildTree(array);

  function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) return;
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  function buildTree(arr) {
    if (!Array.isArray(arr) || arr.length === 0) return null;

    const sorted = Array.from(new Set(arr)).sort((a, b) => a - b);

    function build(start, end) {
      if (start > end) return null;
      const mid = Math.floor((start + end) / 2);
      const node = createNode(sorted[mid]);
      node.left = build(start, mid - 1);
      node.right = build(mid + 1, end);
      return node;
    }

    return build(0, sorted.length - 1);
  }

  function insert(value) {
    const node = createNode(value);
    let current = root;

    function traverse(current) {
      if (current) {
        if (node.value > current.value) {
          if (current.right) {
            current = current.right;
            return traverse(current);
          } else {
            current.right = node;
            return node;
          }
        } else if (node.value < current.value) {
          if (current.left) {
            current = current.left;
            return traverse(current);
          } else {
            current.left = node;
            return node;
          }
        } else if (node.value === current.value) {
          return null;
        }
      } else {
        root = node;
        return node;
      }
    }

    return traverse(current);
  }

  function deleteItem(value) {
    if (!root) return false;

    let parent = null;
    let node = root;
    while (node && node.value !== value) {
      parent = node;
      node = value < node.value ? node.left : node.right;
    }

    if (!node) return false; // not found

    // If node has two children
    if (node.left && node.right) {
      let succParent = node;
      let succ = node.right;
      while (succ.left) {
        succParent = succ;
        succ = succ.left;
      }
      // copy successor value into node
      node.value = succ.value;
      // now delete succ
      parent = succParent;
      node = succ;
    }

    // Now node has at most one child
    const child = node.left || node.right;

    if (!parent) {
      // node to be removed is root, so parent is null
      root = child;
    } else if (parent.left === node) {
      parent.left = child;
    } else {
      parent.right = child;
    }

    return true;
  }

  function find(value) {
    if (!root) return null;
    let current = root;

    while (current.value !== value) {
      current = value < current.value ? current.left : current.right;
    }
    return current;
  }

  function levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Expected a callback function as an argument for levelOrderForEach()');
    }
    if (!root) return [];

    const levelOrderTraversalValues = [];
    const queue = [];
    let idx = 0;
    queue.push(root);

    while (idx < queue.length) {
      // for better performance, dequeuing by advancing an index is preferred to array.shift()
      const current = queue[idx++];
      const result = callback(current);
      levelOrderTraversalValues.push(result);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }

    return levelOrderTraversalValues;
  }

  function preOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Expected a callback function as an argument for preOrderForEach()');
    }
    if (!root) return [];

    const preOrderTraversalValues = [];

    function traverse(node) {
      if (!node) return;    // when node.child is null
      const result = callback(node);
      preOrderTraversalValues.push(result);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(root);
    return preOrderTraversalValues;
  }

  function inOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Expected a callback function as an argument for inOrderForEach()');
    }
    if (!root) return [];

    const inOrderTraversalValues = [];

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      const result = callback(node);
      inOrderTraversalValues.push(result);
      traverse(node.right);
    }

    traverse(root);
    return inOrderTraversalValues;
  }

  function postOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('Expected a callback function as an argument for postOrderForEach()');
    }
    if (!root) return [];

    const postOrderTraversalValues = [];

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      const result = callback(node);
      postOrderTraversalValues.push(result);
    }

    traverse(root);
    return postOrderTraversalValues;
  }

  function height(value) {
    if (!root) return null;

    function traverse(node) {
      if (value > node.value) {
        return node.right ? traverse(node.right) : null;
      } else if (value < node.value) {
        return node.left ? traverse(node.left) : null;
      } else { // value === node.value
        return node;
      }
    }

    const targetNode = traverse(root);
    if (!targetNode) return null; // value not found

    function findHeight(node) {
      if (!node) return -1;
      return Math.max(findHeight(node.left), findHeight(node.right)) + 1;
    }

    return findHeight(targetNode);
  }

  function depth(value) {

  }


  return { 
    getRoot() { return root },
    prettyPrint,
    insert,
    deleteItem,
    find,
    levelOrderForEach,
    preOrderForEach,
    inOrderForEach,
    postOrderForEach,
    height,
    depth,
  };
}
