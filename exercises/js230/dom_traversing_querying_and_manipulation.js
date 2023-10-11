// Counting Nodes
// 11 and 9


// Child Nodes
// 1:  21
// 2:  3
// 3:  1
// 4:  4
// 5:  1
// 6:  2
// 7:  1
// 8:  3
// 9:  2
// 10: 1

//Further Exploration
function walk(node, callback) {
  callback(node);

  for (let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

function childNodes(id) {
  let node =     document.getElementById(id);
  let indirect = 0;

  walk(node, () => indirect += 1);

  return [node.childNodes.length, indirect - node.childNodes.length - 1];
}


// Tracing the DOM Tree
function walkUp(node, callback) {
  callback(node);

  if (node.parentNode) walkUp(node.parentNode, callback);
}

function domTreeTracer(id) {
  let results = [];
  let node = document.getElementById(String(id));

  walkUp(node, (currentNode) => {
    if (currentNode.parentNode) {
      results.push(Array.from(currentNode.parentNode.childNodes)
             .map(n => n.tagName)
             .filter(n => n));
    }
  });

  return results.slice(0, results.length - 2);
}


// Tree Slicing
function stringifyId(id) {
  return '#\\3' + String(id)[0] + ' ' + String(id).slice(1);
}

function sliceTree(startId, endId) {
  let startNode = document.getElementById(String(startId));
  let endNode   = document.getElementById(String(endId));
  if (!startNode || !endNode ||
      !startNode.closest('body') || !endNode.closest('body') ||
      !endNode.closest(stringifyId(startId))) {
    return undefined;
  }

  let results = [];
  let stop = false;
  walkUp(endNode, function(node) {
    if (stop) return;

    if (node === startNode) stop = true;
    results.push(node.tagName);
  });

  return results.reverse();
}


// Coloring
function colorGeneration(targetGen) {
  walk(document.body, (node) => {
    if (!node.children) return;

    Array.from(node.children).forEach(child => {
      child.gen = node.gen + 1 || 1;
      if (node.gen === targetGen - 1) child.classList.add('generation-color');
    });
  });
}


// Node Swap
function nodeSwap(id1, id2) {
  let node1 = document.getElementById(id1);
  let node2 = document.getElementById(id2);
  if (!node1 || !node2||
      node1.closest(stringifyId(id2)) || node2.closest(stringifyId(id1))) {
    return undefined;
  }

  let node1Clone = node1.cloneNode(true);
  let node2Clone = node2.cloneNode(true);
  node1.parentNode.replaceChild(node2Clone, node1);
  node2.parentNode.replaceChild(node1Clone, node2);

  return true;
}


//Further Exploration
function nodeSwap(id1, id2) {
  let node1       = document.getElementById(id1);
  let node1Parent = node1.parentNode;
  let node2       = document.getElementById(id2);
  let node2Parent = node2.parentNode;
  if (!node1 || !node2||
      node1.closest(stringifyId(id2)) || node2.closest(stringifyId(id1))) {
    return undefined;
  }

  let node1Location = document.createElement('node1');
  let node2Location = document.createElement('node2');
  node1Parent.insertBefore(node1Location, node1);
  node2Parent.insertBefore(node2Location, node2);

  node1Parent.replaceChild(node2, node1Location);
  node2Parent.replaceChild(node1, node2Location);

  return true;
}


// Nodes to Array
function nodesToArr() {
  return JSON.stringify(arrayifyNode(document.body));
}

function arrayifyNode(node) {
  return [node.tagName, Array.from(node.children).map(child => arrayifyNode(child))];
}


// Array to Nodes
function arrayToNodes(arr, parentNode = document.querySelector('html')) {
  if (typeof arr[0] === 'string') {
    let newParent = document.createElement(arr[0]);
    parentNode.appendChild(newParent);

    arr[1].forEach(subarr => arrayToNodes(subarr, newParent));
  } else {
    arr.forEach(subarr => arrayToNodes(subarr, parentNode));
  }
}


// Work Back
<html>
  <head>
    <title>
      Title
    </title>
  </head>
  <body>
    <header>
      Header
    </header>
    <section>
      <div>
        <h1>H1</h1>
        <p>Hello</p>
        <p>World</p>
      </div>
    </section>
    <footer>
      <span class="emphasis"></span>
    </footer>
  </body>
</html>


// HTML Imaging
<!doctype html>
<html>
  <head>
    <title>HTML Imaging</title>
    <style type="text/css">
      .emphasis { font-weight: bold; }
      .light { color: gray; }
    </style>
  </head>
  <body>
    <header id="header">
      <h1 class="emphasis light">Dynamic Content</h1>
      <p>Hello World!</p>
    </header>
  </body>
</html>