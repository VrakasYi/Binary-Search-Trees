function Node(data) {
  return {
    data: data,
    left: null,
    right: null
  };
};

function Tree(array) {    
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    };
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    };
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    };
  };

  let root = buildTree(array);
  
  function buildTree(array) {
    // Sort the array in ascending order
    let arr = array.sort((a, b) => a - b);
    // Remove duplicates by converting to a Set and then back to an array
    arr = [...new Set(arr)];
    
    // If the array is empty, return null (base case for recursion)
    if (arr.length === 0) {
      return null;
    };

    // Find the index of the middle element in the sorted array
    const middleIndex = Math.floor(arr.length / 2);

    // Create the root node with the middle element as its value
    const rootNode = new Node(arr[middleIndex]);

    // Recursively build the left subtree with elements to the left of the middle index
    const left = arr.slice(0, middleIndex);
    rootNode.left = buildTree(left);

    // Recursively build the right subtree with elements to the right of the middle index
    const right = arr.slice(middleIndex + 1);
    rootNode.right = buildTree(right);

    // Return the root node of the built binary search tree
    return rootNode;
  }; 


  function insert(value) {
    // Start traversal from the root node
    let node = root;

    // If the tree is empty, create a new root node with the given value
    if (root === null) {
      root = new Node(value);
      return;
    };

    // Traverse the tree to find the appropriate position to insert the new node
    while (node !== null) {
      // If the value is greater than the current node's data, move to the right subtree
      if (value > node.data) {
        // If the right child is null, create a new node and assign it as the right child
        if (node.right === null) {
          node.right = new Node(value);
          return;
        };
        // Move to the right child
        node = node.right;
      } 
      // If the value is less than the current node's data, move to the left subtree
      else if (value < node.data) {
        // If the left child is null, create a new node and assign it as the left child
        if (node.left === null) {
          node.left = new Node(value);
          return;
        }
        // Move to the left child
        node = node.left;
      }
      // If the value is equal to the current node's data, it already exists in the tree
      else {
        return;
      };
    };
  };


  function deleteItem(value) {
    let node = root

    if (root === null) {
      return 'Nothing to delete';
    }

    let aboveNode = root;
    while (value !== node.data) {
      if (value > node.data) {
        if (node.right === null) return 'This node does not exist';
        aboveNode = node;
        node = node.right;
      };
      if (value < node.data) {
        if (node.left === null) return 'This node does not exist';
        aboveNode = node;
        node = node.left;
      };
    };
    //NODE = VALUE
    //No children
    if (node.left === null && node.right === null) {
      if (aboveNode.left === node) aboveNode.left = null;
      if (aboveNode.right === node) aboveNode.right = null;
    };
    //1 child
    //right child
    if (node.left === null && node.right !== null) {
      if (aboveNode.left === node) aboveNode.left = node.right;
      if (aboveNode.right === node) aboveNode.right = node.right;
    };
    //left child
    if (node.right === null && node.left !== null) {
      if (aboveNode.left === node) aboveNode.left = node.left;
      if (aboveNode.right === node) aboveNode.right = node.left;
    };
    //2 children
    if (node.left !== null && node.right !== null) {
      let replaceNode = node.right;

      while (replaceNode.left !== null && replaceNode.data > replaceNode.left.data) {
        aboveNode = replaceNode;
        replaceNode = replaceNode.left;
      };

      aboveNode.left = null;
      node.data = replaceNode.data;
    };
    return;
  };
    
  function find(value) {
    let node = root;

    // Continue until the value is found or until reaching a leaf node
    while (value !== node.data) {
      // If the value is greater than the current node's data, move to the right subtree
      if (value > node.data) {
        if (node.right === null) return 'This node does not exist';
        node = node.right;
      };
      if (value < node.data) {
        if (node.left === null) return 'This node does not exist';
        node = node.left;
      };
    };
    return node
  };

  function levelOrder(callback = null) {
    // Initialize an empty array to store the result
    let result = [];
    // If no callback function is provided
    if (!callback) {
      if (!root) return result;
      // Initialize a queue for level order traversal and add the root node to it
      let queue = []
      queue.push(root)

      while (queue.length > 0) {
        // Remove the first node from the queue
        const node = queue.shift();
        // Push the node's data into the result array
        result.push(node.data);
        // Add the left child of the node to the queue if it exists
        if (node.left) queue.push(node.left);
        // Add the right child of the node to the queue if it exists
        if (node.right) queue.push(node.right);
      };
      return result;
      
    } else { // If a callback function is provided
      // Check if the root is null, if so, return
      if (!root) return;
      
      // Initialize a queue for level order traversal and add the root node to it
      const queue = [root];

      // Perform level order traversal
      while (queue.length > 0) {
        // Remove the first node from the queue
        const node = queue.shift();
        // Invoke the callback function with the node's data
        callback(node.data);
        // Add the left child of the node to the queue if it exists
        if (node.left) queue.push(node.left);
        // Add the right child of the node to the queue if it exists
      if (node.right) queue.push(node.right);
      };
    };
  };

  function inOrder(callback = null) {
    let result = [];
    if (!root) return result;
    // Start traversal from the root node
    let node = root;
    let queue =[];
    if (!callback) {
      while (node !== null || queue.length > 0) {
        // Traverse to the leftmost node and push nodes onto the stack
        while (node !== null) {
          queue.push(node);
          node = node.left
        };
          // Pop the top node from the stack
          node = queue.pop();
          // Process the popped node
          result.push(node.data);
          // Move to the right subtree
          node = node.right;
      };
      return result;
    } else {
      while (node !== null || queue.length > 0 ) {
        while (node !== null) {
          queue.push(node);
          node = node.left;
        };
        node = queue.pop();
        // Invoke the callback function with the node's data
        callback(node.data);
        node = node.right;
      };
    };
  };
  //Recusive method
  // function inOrder(arr = [], node) {
  //   if (node === null) return;
  //   // Traverse left subtree
  //   if (node.left) this.inorder(arr, node.left);
  //   // Visit the root
  //   if (callback) callback(node.data);
  //   else arr.push(node.data);
  //   // Traverse right subtree
  //   if (node.right) this.inorder(arr, node.right);
  //   return arr;
  // };

  function preOrder(callback = null) {
    let result = [];
    if (!root) return result;
    let node = root;
    let queue =[];
    if (!callback) {
      while (node !== null || queue.length > 0) {
        while (node !== null) {
          queue.push(node);
          result.push(node.data);
          node = node.left
        };
        node = queue.pop();
        node = node.right;
      }
      return result;
    } else {
      while (node !== null || queue.length > 0 ) {
        while (node !== null) {
          queue.push(node);
          callback(node.data);
          node = node.left;
        };
        node = queue.pop();
        node = node.right;
      };
    };
  };
  //Recusive method
  // function preOrder(arr = [], node) {
  //   if (node === null) return;    
  //   if (callback) callback(node.data);
  //   else arr.push(node.data);
  //   if (node.left) this.inorder(arr, node.left);    
  //   if (node.right) this.inorder(arr, node.right);   
  //   return arr;
  // };

  function postOrder(callback = null) {
    let result = [];
    if (!root) return result;

    let node = root;
    let queue = [];
    let aboveNode;
    let lastVisitedNode = null;

    while (node !== null || queue.length > 0) {
      while (node !== null) {
        queue.push(node);
        node = node.left;
      };

      aboveNode = queue[queue.length - 1];

      if (aboveNode.right !== null && lastVisitedNode !== aboveNode.right) {
        node = aboveNode.right;
      } else {
        const current = queue.pop();
        if (!callback) {
          result.push(current.data);
        } else {
          callback(current.data);
        };
        lastVisitedNode = aboveNode;
      };
    };
    return result;
  };

  //Recusive method
  // function postOrder(arr = [], node) {
  //   if (node === null) return;    
  //   if (node.left) this.inorder(arr, node.left);    
  //   if (node.right) this.inorder(arr, node.right);   
  //   if (callback) callback(node.data);
  //   else arr.push(node.data);
  //   return arr;
  // };

  function height(node) {
    let maxHeight = 0;  
    function heightR(node) {
      if (!node) return 0; // Base case: height of an empty tree is 0
      let leftHeight = heightR(node.left);
      let rightHeight = heightR(node.right);
      // Update maxHeight if necessary
      maxHeight = Math.max(leftHeight, rightHeight) + 1;
      // Return the height of the current node
      return maxHeight;
    };
    const foundNode = find(node);
    heightR(foundNode);
    return maxHeight -1;
  };
  
  function depth(value) {
    // Start traversal from the root node
    let node = root;
    // Initialize the level to track the depth of the node
    let level = 0;
  
    // Continue until the value is found or until reaching a leaf node
    while (value !== node.data) {
      // If the value is greater than the current node's data, move to the right subtree
      if (value > node.data) {
        // If the right child is null, the node does not exist in the tree
        if (node.right === null) return 'This node does not exist';
        // Move to the right child and increment the level
        node = node.right;
        level++;
      }
      // If the value is less than the current node's data, move to the left subtree
      else if (value < node.data) {
        // If the left child is null, the node does not exist in the tree
        if (node.left === null) return 'This node does not exist';
        // Move to the left child and increment the level
        node = node.left;
        level++;
      }
    }
  
    // Return the level, which represents the depth of the node
    return level;
  }
  // Recursive approach
  // function depth(value) {
  //   // let maxHeight = 0
  //   function depthR(value, node, depth) {
  //     if (node === null) return 0;
  //     // console.log(node.data);
  //     if (node.data === value) return depth;
  //     const leftDepth = depthR(value, node.left, depth += 1);
  //     if (leftDepth !== 0) return leftDepth; // Return if found in left subtree      
  //     const rightDepth = depthR(value, node.right, depth += 1);
  //     return rightDepth; // Return result from right subtree
  //   };
  //   return depthR(value, root, 0);
  // };
  function isBalanced() {
    let isBalanced = true;
    inOrder(root => {

      let node = find(root);
      let lHeight;
      let rHeight;
      if (node.left !== null) {
        // console.log(node.left);
        lHeight = height(node.left.data);
      } else {
        lHeight = 0;
      };

      if (node.right !== null) {
        // console.log(node.right);
        rHeight = height(node.right.data);
      } else {
        rHeight = 0;
      };

      if (Math.abs(lHeight - rHeight) > 1) {
        isBalanced = false; // Set isBalanced to false if the tree is unbalanced
      };
    });
    return isBalanced;
  };

  function rebalance() {
    // Sort the array in ascending order
    let arr = inOrder()
    console.log(arr);
    // Remove duplicates by converting to a Set and then back to an array
    root = buildTree(arr);
  };

  return {
    get root() { return root; },
    insert,
    deleteItem,
    buildTree,
    prettyPrint,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalanced,
    rebalance
  };
};


const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
// console.log(tree.root);
console.log(tree.isBalanced());
tree.prettyPrint(tree.root);
// console.log(tree.levelOrder());
// console.log(tree.inOrder());
// console.log(tree.preOrder());
// console.log(tree.root.left.data);
// console.log(tree.postOrder());
// console.log(tree.depth(8));
// console.log(tree.height(23))

tree.insert(80);
tree.insert(81);
tree.insert(82);
console.log(tree.isBalanced());
// console.log(tree.height(23))
tree.prettyPrint(tree.root);
tree.rebalance();
tree.prettyPrint(tree.root);
// tree.deleteItem(8)

// tree.prettyPrint(tree.root);
// console.log(tree.find(1))
// console.log(tree.root);

// tree.deleteItem(4);

// console.log(tree.root);
// // console.log(tree.arr);
// console.log(tree.find(23));

// Define the Node and Tree classes as provided previously

// Function to generate an array of random numbers less than 100
// function generateRandomNumbers(count) {
//   const randomNumbers = [];
//   for (let i = 0; i < count; i++) {
//     randomNumbers.push(Math.floor(Math.random() * 100));
//   }
//   return randomNumbers;
// }

// // Create a binary search tree from an array of random numbers
// const randomNumbers = generateRandomNumbers(15); // Generate 15 random numbers
// const tree = new Tree(randomNumbers);

// // Confirm that the tree is balanced
// console.log("Is the tree balanced?", tree.isBalanced());

// // Print out all elements in level, pre, post, and in order
// console.log("Level Order Traversal:", tree.levelOrder().join(", "));
// console.log("Pre Order Traversal:", tree.preOrder().join(", "));
// console.log("Post Order Traversal:", tree.postOrder().join(", "));
// console.log("In Order Traversal:", tree.inOrder().join(", "));

// // Add several numbers greater than 100 to unbalance the tree
// tree.insert(105);
// tree.insert(110);
// tree.insert(115);

// // Confirm that the tree is unbalanced
// console.log("Is the tree balanced after inserting larger numbers?", tree.isBalanced());

// // Balance the tree
// tree.rebalance();

// // Confirm that the tree is balanced after rebalancing
// console.log("Is the tree balanced after rebalancing?", tree.isBalanced());

// // Print out all elements in level, pre, post, and in order after rebalancing
// console.log("Level Order Traversal (after rebalancing):", tree.levelOrder().join(", "));
// console.log("Pre Order Traversal (after rebalancing):", tree.preOrder().join(", "));
// console.log("Post Order Traversal (after rebalancing):", tree.postOrder().join(", "));
// console.log("In Order Traversal (after rebalancing):", tree.inOrder().join(", "));
