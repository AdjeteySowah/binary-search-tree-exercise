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
    let current = root;
    let parentOfCurrentNode;

    function traverse(current) {
      if (current) {
        if (value > current.value) {
          if (current.right) {
            parentOfCurrentNode = current;
            current = current.right;
            return traverse(current);
          } else {
            return false;
          }
        } else if (value < current.value) {
          if (current.left) {
            parentOfCurrentNode = current;
            current = current.left;
            return traverse(current);
          } else {
            return false;
          }
        } else if (value === current.value) {
          if (current.left && current.right) {
            function getLeftmostNodeWithParent(startingNode) {
              let parent = null;
              let node = startingNode;
              while (node.left) {
                parent = startingNode;
                node = startingNode.left;
              }
              return { node, parent };
            }
            const { node: leftmostNode, parent } = getLeftmostNodeWithParent(current.right);

            if (leftmostNode !== current.right && leftmostNode.right) {
              current.right.left = leftmostNode.right;
            } else if (leftmostNode !== current.right) {
              current.right.left = null;
            } else if (leftmostNode === current.right && parent !== current.right) {
              parent.left = null;
            }
            leftmostNode.left = current.left;
            leftmostNode.right = current.right;
            current = leftmostNode;
            return true;
          } else if (current.left || current.right) {
            if (current.left) {
              if (parentOfCurrentNode && parentOfCurrentNode.left === current) {
                parentOfCurrentNode.left = current.left;
              } else if (parentOfCurrentNode && parentOfCurrentNode.right === current) {
                parentOfCurrentNode.right = current.left;
              }
            } else if (current.right) {
              if (parentOfCurrentNode && parentOfCurrentNode.left === current) {
                parentOfCurrentNode.left = current.right;
              } else if (parentOfCurrentNode && parentOfCurrentNode.right === current) {
                parentOfCurrentNode.right = current.right;
              }
            }
            return true;
          } else if (current.left === null && current.right === null) {
            current = null;
            return true;
          }
        }
      } else {
        return false;
      }
    }

    return traverse(current);
  }

  return { 
    getRoot() { return root },
    prettyPrint,
    insert,
    deleteItem,
  };
}
