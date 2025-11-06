# Binary Search Tree (BST) Exercise/Project

A small **Binary Search Tree** implementation in JavaScript using the **factory pattern** built to meet [The Odin Project's Binary Search Trees assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees). The project exposes a `createTree()` factory that builds a balanced BST from an array and provides common BST operations (insert, delete, traversals, balance checks, and rebalancing). It's intended for learning and manual/dev testing — no external dependencies or automated tests are included. See the implementation in `bs-tree.js`. 

---

## Features / API

The `createTree(array)` factory returns an object exposing the following methods:

* `getRoot()` — returns the root node (useful for `prettyPrint()`).
* `prettyPrint(node)` — prints the tree to the console in a visual (rotated) format.
* `insert(value)` — inserts `value` into the BST (duplicates ignored).
* `deleteItem(value)` — removes `value` from the BST; returns `true` if removed, `false` if not found.
* `find(value)` — returns the node that contains `value` or `null` if not found.
* `levelOrderForEach(callback)` — level-order traversal, returns an array of callback results.
* `preOrderForEach(callback)` — pre-order traversal, returns an array of callback results.
* `inOrderForEach(callback)` — in-order traversal, returns an array of callback results.
* `postOrderForEach(callback)` — post-order traversal, returns an array of callback results.
* `height(value)` — returns the height of the node that contains `value`, or `null` if not found.
* `depth(value)` — returns the depth (distance from root) of the node with `value`, or `null` if not found.
* `isBalanced()` — returns `true` if the tree is height-balanced (every node's subtrees differ by ≤ 1).
* `rebalance()` — re-builds the tree into a balanced BST using a level-order snapshot.

(These methods are implemented and returned by the factory in `bs-tree.js`.) 

---

## Default behavior / Design notes

* `createTree(array)` accepts an array of numbers. The initial tree is built by:

  * deduplicating the array,
  * sorting it,
  * and building a balanced BST via recursive middle-element selection.
* Duplicate values are ignored when inserting.
* `rebalance()` builds a new tree from the current level-order values so the structure becomes balanced again.
* `isBalanced()` computes node heights (using a stack-based post-order traversal helper) and then checks every node to ensure the left/right heights differ by at most 1. 

---

## Files

* `bs-tree.js` — the `createTree()` factory and full BST implementation. 
* `driver.js` — manual integration/driver script that builds a tree with random numbers, demonstrates traversals, intentionally unbalances the tree, rebalances it, and logs outputs. Use this to exercise the public API. 
* `index.html` — minimal HTML file that loads `driver.js` as an ES module so you can run the driver in the browser and debug using DevTools. 

---

## Usage

### Run in the browser (recommended for manual debugging)

1. Open `index.html` in a modern browser (double-click the file or serve the folder). 
2. Open DevTools → **Console** / **Sources** to view and step through `driver.js`. The script imports the factory and runs example flows. 

### Programmatic usage (example)

```js
import { createTree } from './bs-tree.js';

const arr = [10, 5, 15, 2, 7, 12, 18];
const tree = createTree(arr);

// Visual inspection
tree.prettyPrint(tree.getRoot());

// Traversals
const inOrder = tree.inOrderForEach(node => node.value);
console.log('In-order:', inOrder);

// Insert and delete
tree.insert(9);
tree.deleteItem(5);

// Check balance and rebalance
console.log('isBalanced:', tree.isBalanced());
tree.rebalance();
```

(See `driver.js` for a full demonstration script.) 

---

## Example (from `driver.js`)

The provided `driver.js`:

* Generates an array of random numbers to build an initial balanced tree.
* Prints the tree (`prettyPrint`) and logs `isBalanced()` which should be `true` initially.
* Logs level-, pre-, in-, and post-order traversal arrays.
* Inserts several large values to intentionally unbalance the tree and re-checks `isBalanced()`.
* Calls `rebalance()`, prints the tree again, and re-checks traversals and balance. 

---

## Expected behaviour

* The initial `createTree(array)` call produces a balanced tree (assuming the input array has multiple distinct numbers).
* Duplicate values are ignored (no duplicate nodes).
* `isBalanced()` returns `false` after you insert a sequence of values that skew one side of the tree, and `true` again after `rebalance()` is called.
* Traversal methods return arrays of the **callback** results in the traversal order (use `node => node.value` to get values).

---

## Implementation notes (important details)

* The factory creates node objects `{ value, left, right }`. Node identity is used internally for bookkeeping (e.g., height map). 
* `buildTree()` deduplicates input using `Set` and sorts the values so the initial tree is balanced (middle element strategy). 
* `isBalanced()` relies on a `computeHeights()` helper that uses an explicit stack to compute heights in a single post-order-style pass and returns a `WeakMap` mapping node → height; that map is then used while breadth-first traversing all nodes to check balance. This avoids repeated recursive height computations. 
* `rebalance()` rebuilds the tree from `levelOrderForEach(node => node.value)` snapshot so the new tree is balanced while preserving the set of stored values. 
