import { createTree } from "./bs-tree.js";

const generateArrayOfRandomNumbers = () => {
  const arr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 1);
  return arr;
}

const tree = createTree(generateArrayOfRandomNumbers());
tree.prettyPrint(tree.getRoot());
console.log('\n\n');

  // Confirm that the tree is balanced
console.log('isBalanced:', tree.isBalanced());
console.log('\n\n');

  // Print out all elements in level, pre, post, and in order.
console.log('Level-order:', tree.levelOrderForEach((node) => node.value));
console.log('Pre-order:', tree.preOrderForEach((node) => node.value));
console.log('In-order:', tree.inOrderForEach((node) => node.value));
console.log('Post-order:', tree.postOrderForEach((node) => node.value));
console.log('\n\n');

  // Unbalance the tree by adding several numbers > 100.
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);
tree.insert(150);

  // Confirm that the tree is unbalanced
tree.prettyPrint(tree.getRoot());
console.log('\n\n');

console.log('isBalanced:', tree.isBalanced());
console.log('\n\n');

  // Balance the tree by calling rebalance
tree.rebalance();
tree.prettyPrint(tree.getRoot());
console.log('\n\n');

  // Confirm that the tree is balanced
console.log('isBalanced:', tree.isBalanced());
console.log('\n\n');

  // Print out all elements in level, pre, post, and in order.
console.log('Level-order:', tree.levelOrderForEach((node) => node.value));
console.log('Pre-order:', tree.preOrderForEach((node) => node.value));
console.log('In-order:', tree.inOrderForEach((node) => node.value));
console.log('Post-order:', tree.postOrderForEach((node) => node.value));
