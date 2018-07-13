function startTree(element) {
  if (!isElement(element)) {
    console.error('Element passed to makeTree is not of type HTML Element');
    return null;
  }
  let obj = {};
  obj.tree = {};
  obj.tree.type = element.tagName;
  obj.tree.attributes = {}; //might want to always make this

  for (let i = 0; i < element.attributes.length; i++) {
    obj.tree.attributes[element.attributes[i].name] = element.attributes[i].value;
  }
  obj.tree.children = makeTree(element);

  return obj;
}

function makeTree(element) {
  let children = [];
  for (let i = 0; i < element.childNodes.length; i++) {
    let node = element.childNodes[i];
    if (node.nodeType !== 1) {
      continue;
    }
    let child = {};
    child.attributes = {};
    if (node.attributes) {
      for (let j = 0; j < node.attributes.length; j++) {
        child.attributes[node.attributes[j].name] = node.attributes[j].value;
      }
    }
    child.type = node.tagName;
    child.children = makeTree(node);
    children.push(child);
  }
  return children;
}

function isElement(element) {
  return element instanceof Element;
}