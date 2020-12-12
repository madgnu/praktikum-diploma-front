import render from './render.js';
import applyAttribute from './applyAttribute.js';

function patch(vdom, node, parent = node.parentNode) {
  const replace = (newNode) => parent.replaceChild(newNode, node) && newNode;
  if (typeof vdom === 'object' && typeof vdom.type === 'function') {
    return Component.patch(vdom, node, parent);
  } else if (typeof vdom === 'string' && node instanceof Text) {
    return node.textContent !== vdom ? replace(render(vdom, parent)) : node;
  } else if (typeof vdom === 'object' && node instanceof Text) {
    return replace(render(vdom, parent));
  } else if (typeof vdom === 'object' && vdom.type.toUpperCase() !== node.nodeName) {
    return replace(render(vdom, parent));
  } else if (typeof vdom === 'object' && vdom.type.toUpperCase() === node.nodeName) {
    const activeNode = document.activeElement;
    const keyChields = {};
    node.childNodes.forEach((el, i) => (keyChields[`${el.__key || `__DUMMY_KEY__${i}`}`] = el));

    let prevNode =  null;
    vdom.children.forEach((el, i) => {
      const key = (el.props && el.props.key) || `__DUMMY_KEY__${i}`;
      let currentNode = null;
      if (keyChields[key]) {
        currentNode = patch(el, keyChields[key]);
      } else {
        currentNode = render(el, node);
        if (i > 0) {
          prevNode.after(currentNode);
        } else {
          node.appendChild(currentNode);
        }
      }
      prevNode = currentNode;
      delete keyChields[key];
    });
    for (let k in keyChields) {
      if (keyChields[k].__instance) keyChields[k].__instance.componentWillUnmount();
      keyChields[k].remove()
    };

    const vdomPropsDiff = { ...vdom.props };

    for (let propName in node.__props) {
      if (typeof node.__props[propName] === 'function') continue;
      if (node.__props[propName] === vdomPropsDiff[propName]) {
        delete vdomPropsDiff[propName];
        continue;
      } else if (typeof node.__props[propName] === 'object' && typeof (vdomPropsDiff[propName] === 'object') && JSON.stringify(node.__props[propName]) === JSON.stringify(vdomPropsDiff[propName])) {
        delete vdomPropsDiff[propName];
        continue;
      }
      const domPropName = propName === 'className' ? 'class' : propName;
      node.removeAttribute(domPropName);
    }

    for (let propName in vdomPropsDiff)
      applyAttribute(node, propName, vdom.props[propName]);
    activeNode.focus();
    return node;
  }
}

class Component {
  constructor(props) {
    this.props = props || {};
    this.state = null;
  }

  static render(vdom, parent) {
    const props = Object.assign({}, vdom.props, { children: vdom.children });
    if (Component.isPrototypeOf(vdom.type)) {
      const instance = new vdom.type(props);
      const node = render(instance.render(), parent);
      node.__instance = instance;
      node.__key = vdom.props.key;
      instance.__node = node;
      instance.componentDidMount();
      return node;
    } else return render(vdom.type(props), parent);
  }

  static patch(vdom, node, parent = node.parentNode) {
    const props = Object.assign({}, vdom.props, { children: vdom.children });
    if (node.__instance && node.__instance.constructor === vdom.type) {
      const instance = node.__instance;
      const willPatch = instance.shouldComponentUpdate(instance.state, props);
      instance.props = props;
      if (willPatch) {
        return patch(node.__instance.render(), node, parent);
      }
      return node;
    } else if (Component.isPrototypeOf(vdom.type)) {
      const newNode = Component.render(vdom, parent);
      return parent ? parent.replaceChild(newNode, node) && newNode : newNode;
    } else return patch(vdom.type(props), node, parent);
  }

  setState(nextState) {
    if (typeof this.state !== 'object') this.state = {};
    if (this.__node) {
      const newState = Object.assign({}, this.state, nextState);
      const oldState = this.state;
      const willUpdate = this.shouldComponentUpdate(nextState, this.props);
      if (willUpdate) {
        this.componentWillUpdate(this.props, nextState);
        this.state = newState;
        patch(this.render(), this.__node);
        this.componentDidUpdate(this.props, oldState);
      } else {
        this.state = newState;
      }
    }
  }

  shouldComponentUpdate(nextState, nextProps) {
    return (nextState !== this.state) || (nextProps !== this.props);
  }

  componentDidMount() {
    return undefined;
  }

  componentWillUnmount() {
    return undefined;
  }

  componentWillUpdate() {
    return undefined;
  }

  componentDidUpdate() {
    return undefined;
  }
}

export default Component;
