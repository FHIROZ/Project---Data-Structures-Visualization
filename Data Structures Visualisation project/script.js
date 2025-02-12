function openSection(sectionId) {
    document.querySelectorAll('.content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}
/* ==============================
   Array Visualization
   ============================== */
  let arrayElements = [];

  document.getElementById('arrayForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const elementValue = document.getElementById('array-element').value.trim();
    if (elementValue !== '') {
      // Add new element to the array
      arrayElements.push(elementValue);
      drawArrayVisualization(arrayElements);
      document.getElementById('array-element').value = ''; // Reset input field
    }
  });

function drawArrayVisualization(array) {
  const canvas = document.getElementById('arrayCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const cellWidth = canvas.width / array.length;
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw array elements as cells
  for (let i = 0; i < array.length; i++) {
    ctx.strokeRect(i * cellWidth, 50, cellWidth, 50); // Draw rectangle for each element
    ctx.fillText(array[i], i * cellWidth + cellWidth / 2, 80); // Center text inside the rectangle
  }
}
          
  /* ==============================
      Linked List Visualization
      ============================== */
  let linkedListNodes = [];
  document.getElementById('linkedListForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const nodeValue = document.getElementById('list-node').value.trim();
  if (nodeValue !== '') {
      linkedListNodes.push(nodeValue);
      drawLinkedListVisualization();
      document.getElementById('list-node').value = '';
  }
  });

  function drawLinkedListVisualization() {
  const canvas = document.getElementById('linkedListCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const nodeWidth = 80;
  const nodeHeight = 40;
  const gap = 20;
  ctx.font = '16px Arial';
  linkedListNodes.forEach((value, index) => {
      const x = index * (nodeWidth + gap) + 20;
      const y = canvas.height / 2 - nodeHeight / 2;
      // Draw node rectangle
      ctx.strokeRect(x, y, nodeWidth, nodeHeight);
      ctx.fillText(value, x + nodeWidth / 2 - 5, y + nodeHeight / 2 + 5);
      // Draw arrow if not the last node
      if (index < linkedListNodes.length - 1) {
      ctx.beginPath();
      ctx.moveTo(x + nodeWidth, y + nodeHeight / 2);
      ctx.lineTo(x + nodeWidth + gap, y + nodeHeight / 2);
      ctx.stroke();
      // Arrow head
      ctx.beginPath();
      ctx.moveTo(x + nodeWidth + gap - 5, y + nodeHeight / 2 - 5);
      ctx.lineTo(x + nodeWidth + gap, y + nodeHeight / 2);
      ctx.lineTo(x + nodeWidth + gap - 5, y + nodeHeight / 2 + 5);
      ctx.fill();
      }
  });
  }
  
    /* ==============================
        Tree Visualization
        ============================== */
    let treeNodes = [];
    document.getElementById('treeForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const nodeValue = document.getElementById('tree-node').value.trim();
      if (nodeValue !== '') {
        treeNodes.push(nodeValue);
        drawTreeVisualization();
        document.getElementById('tree-node').value = '';
      }
    });

    function drawTreeVisualization() {
      const canvas = document.getElementById('treeCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '16px Arial';
      // A simple binary tree drawing in level order
      const levels = Math.ceil(Math.log2(treeNodes.length + 1));
      let index = 0;
      for (let level = 0; level < levels; level++) {
        const nodesInLevel = Math.pow(2, level);
        const gap = canvas.width / (nodesInLevel + 1);
        for (let i = 1; i <= nodesInLevel && index < treeNodes.length; i++) {
          const x = i * gap;
          const y = level * 60 + 20;
          // Draw node (circle)
          ctx.beginPath();
          ctx.arc(x, y, 20, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fillText(treeNodes[index], x - 5, y + 5);
          // Draw connection from parent (if not root)
          if (level > 0) {
            const parentLevel = level - 1;
            const parentIndex = Math.floor((i - 1) / 2);
            const parentNodesInLevel = Math.pow(2, parentLevel);
            const parentGap = canvas.width / (parentNodesInLevel + 1);
            const parentX = (parentIndex + 1) * parentGap;
            const parentY = parentLevel * 60 + 20;
            ctx.beginPath();
            ctx.moveTo(parentX, parentY + 20);
            ctx.lineTo(x, y - 20);
            ctx.stroke();
          }
          index++;
        }
      }
    }

    /* ==============================
        Graph Visualization
        ============================== */
    let graphNodes = [];
    let graphEdges = [];
    document.getElementById('graphForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const nodeValue = document.getElementById('graph-node').value.trim();
      if (nodeValue !== '') {
        // Add a new node at a random position within the canvas bounds
        graphNodes.push({
          value: nodeValue,
          x: Math.random() * 700 + 50,
          y: Math.random() * 200 + 50
        });
        // Optionally, add an edge connecting the last two nodes
        if (graphNodes.length > 1) {
          const len = graphNodes.length;
          graphEdges.push({ from: graphNodes[len - 2], to: graphNodes[len - 1] });
        }
        drawGraphVisualization();
        document.getElementById('graph-node').value = '';
      }
    });

    function drawGraphVisualization() {
      const canvas = document.getElementById('graphCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '16px Arial';
      // Draw edges
      graphEdges.forEach(edge => {
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.stroke();
      });
      // Draw nodes
      graphNodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillText(node.value, node.x - 5, node.y + 5);
      });
    }

    /* ==============================
        Sorting Visualization
        ============================== */
    document.getElementById('sortingForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const size = parseInt(document.getElementById('array-sort').value, 10);
      let array = [];
      for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100));
      }
      drawSortingVisualization(array);
      // You can also implement an animated sorting algorithm here.
    });

    function drawSortingVisualization(array) {
      const canvas = document.getElementById('sortingCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width / array.length;
      ctx.font = '16px Arial';
      array.forEach((value, index) => {
        const barHeight = value * 2; // Scale the value for display
        ctx.fillStyle = 'blue';
        ctx.fillRect(index * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
        ctx.strokeRect(index * barWidth, canvas.height - barHeight, barWidth - 2, barHeight);
      });
    }
    /* ==============================
          Stack Visualization
          ============================== */
  // Set up initial state for stack and queue
  let stack = [];
  let queue = [];
  
  // Event listener for Stack Push
  document.getElementById('stackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const value = document.getElementById('stack-value').value.trim();
    if (value !== '') {
      stack.push(value);
      drawStackVisualization();
      document.getElementById('stack-value').value = '';
    }
  });
  
  // Function to draw Stack visualization
  function drawStackVisualization() {
    const canvas = document.getElementById('stackCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const nodeHeight = 40;
    const gap = 10;
    ctx.font = '16px Arial';
  
    stack.forEach((value, index) => {
      const y = canvas.height - (index + 1) * (nodeHeight + gap);
      ctx.strokeRect(100, y, 200, nodeHeight);
      ctx.fillText(value, 200, y + nodeHeight / 2 + 5);
    });
  }
    
    // Function to pop from stack
    function popStack() {
      if (stack.length > 0) {
        stack.pop();
        drawStackVisualization();
      }
    }
    
    // Event listener for Queue Enqueue
    document.getElementById('queueForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const value = document.getElementById('queue-value').value.trim();
      if (value !== '') {
        queue.push(value);
        drawQueueVisualization();
        document.getElementById('queue-value').value = '';
      }
    });
    
    // Function to draw Queue visualization
    function drawQueueVisualization() {
      const canvas = document.getElementById('queueCanvas');
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const nodeWidth = 80;
      const nodeHeight = 40;
      const gap = 20;
      ctx.font = '16px Arial';
    
      queue.forEach((value, index) => {
        const x = index * (nodeWidth + gap) + 20;
        const y = canvas.height / 2 - nodeHeight / 2;
        ctx.strokeRect(x, y, nodeWidth, nodeHeight);
        ctx.fillText(value, x + nodeWidth / 2 - 5, y + nodeHeight / 2 + 5);
      });
    }
    
    // Function to dequeue from queue
    function dequeueQueue() {
      if (queue.length > 0) {
        queue.shift();
        drawQueueVisualization();
      }
    }
    
    // Show/hide Stack and Queue sections based on button clicks
    document.getElementById('stackButton').addEventListener('click', function() {
      document.getElementById('stack').style.display = 'block';
      document.getElementById('queue').style.display = 'none';
    });
    
    document.getElementById('queueButton').addEventListener('click', function() {
      document.getElementById('queue').style.display = 'block';
      document.getElementById('stack').style.display = 'none';
    });
    
    // Initially show the Stack section by default
    document.getElementById('stack').style.display = 'block';
    document.getElementById('queue').style.display = 'none';
    
    
    
