const vDom = {
  TEXT_NODE_TYPE: 3,

  createVNode(tag, attrs = {}, children = []) {
    return {
      tag,
      attrs,
      children,
    };
  },

  createDOMNode(vNode) {
    if (typeof vNode === 'string') {
      return document.createTextNode(vNode);
    }

    const { tag, attrs, children } = vNode;
    const node = document.createElement(tag);

    this.updateAttrs(node, {}, attrs);

    children.forEach(child => {
      node.appendChild(this.createDOMNode(child));
    });

    return node;
  },

  getNewNode(node, newVNode) {
    const newNode = this.createDOMNode(newVNode);
    node.replaceWith(newNode);
    return newNode;
  },

  updateNode(node, vNode, newVNode) {
    if (newVNode === undefined) {
      node.remove();
      return undefined;
    }

    if (typeof vNode === 'string' || typeof newVNode === 'string') {
      if (vNode !== newVNode) {
        const newNode = this.getNewNode(node, newVNode);
        return newNode;
      }
      return node;
    }

    if (vNode.tag !== newVNode.tag) {
      const newNode = this.getNewNode(node, newVNode);
      return newNode;
    }

    this.updateAttrs(node, vNode.attrs, newVNode.attrs);
    this.updateChildren(node, vNode.children, newVNode.children);

    return node;
  },

  updateAttr(node, key, value, newValue) {
    if (key.startsWith('on')) {
      const eventName = key.slice(2);

      node[eventName] = newValue;

      if (!newValue) {
        node.removeEventListener(eventName, this.listener);
      } else if (!value) {
        node.addEventListener(eventName, this.listener);
      }
      return;
    }

    if (newValue === null || newValue === false) {
      node.removeAttribute(key);
      return;
    }
    node.setAttribute(key, newValue);
  },

  updateAttrs(node, attrs, newAttrs) {
    const jointAttrs = { ...attrs, ...newAttrs };

    Object.keys(jointAttrs).forEach(key => {
      if (attrs[key] !== newAttrs[key]) {
        this.updateAttr(node, key, attrs[key], newAttrs[key]);
      }
    });
  },

  updateChildren(parent, vChildren, newVChildren) {
    parent.childNodes.forEach((childNode, i) => {
      this.updateNode(childNode, vChildren[i], newVChildren[i]);
    });
    newVChildren.slice(vChildren.length).forEach(vChild => {
      parent.appendChild(this.createDOMNode(vChild));
    });
  },

  recycleNode(node) {
    if (node.nodeType === this.TEXT_NODE_TYPE) {
      return node.nodeValue;
    }

    const tag = node.nodeName.toLowerCase();

    const children = [].map.call(node.childNodes, this.recycleNode);

    return this.createVNode(tag, {}, children);
  },

  update(newVNode, node) {
    let nodeEl = node;

    const vNode = nodeEl.v || this.recycleNode(node);

    nodeEl = this.updateNode(nodeEl, vNode, newVNode);
    nodeEl.v = newVNode;

    return nodeEl;
  },

  listener(event) {
    return this[event.type](event);
  },
};

export default vDom;
