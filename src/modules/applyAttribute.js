export default function (node, k, v) {
  if (k == 'className') {
    node[k] = v;
  } else if (k == 'style') {
    Object.assign(node[k], v);
  } else if (k.startsWith('on')) {
    const eventType = k.slice(2).toLowerCase();
    node.__eventListeners = node.__eventListeners || {};
    if (node.__eventListeners[eventType] !== v) {
      node.removeEventListener(eventType, node.__eventListeners[eventType]);
      node.__eventListeners[eventType] = v;
      node.addEventListener(eventType, v);
    }
  } else if (k === 'key') {
    node.__key = v;
  } else if (k === 'ref') {
    v(node);
  } else if (k === 'disabled' || k === 'required') {
    if (v) node.setAttribute(k, v);
    else node.removeAttribute(k);
  } else if (typeof v !== 'object' && typeof v !== 'function') {
    node.setAttribute(k, v);
  }
  node.__props = node.__props || {};
  node.__props[k] = v;
}
