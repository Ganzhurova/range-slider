// import Component from './subViews/Component';

const vDom = {
  createVNode(tag, attrs = {}, children = []) {
    return { tag, attrs, children };
  },

  updateAttr($node, key, value, newValue) {
    if (newValue === null || newValue === false) {
      $node.removeAttribute(key);
      return;
    }

    $node.setAttribute(key, newValue);
  },

  updateAttrs($node, attrs, newAttrs) {
    const jointAttrs = { ...attrs, ...newAttrs };

    Object.keys(jointAttrs).forEach(key => {
      if (attrs[key] !== newAttrs[key]) {
        this.updateAttr($node, key, attrs[key], newAttrs[key]);
      }
    });
  },

  updateChildren($parent, vChildren, newVChildren) {
    console.log($parent);
    console.log(vChildren);
    console.log(newVChildren);
    // $parent.childNodes.forEach((childNode, i) => {
    //   this.updateNode(childNode, vChildren[i], newVChildren[i]);
    // });
    // newVChildren.slice(vChildren.length).forEach(vChild => {
    //   $parent.appendChild(this.createDOMNode(vChild));
    // });
  },

  // getNewNode($node, newVNode) {
  //   const $newNode = this.createDOMNode();
  // },

  updateNode($node, vNode, newVNode) {
    if (newVNode === undefined) {
      $node.remove();
      return undefined;
    }

    // if (typeof vNode === 'string' || typeof newVNode === 'string') {
    //   if (vNode !== newVNode) {
    //     const $newNode = this.getNewNode($node, newVNode);
    //     return $newNode;
    //   }
    //   return $node;
    // }
    //
    // if (vNode.tag !== newVNode.tag) {
    //   const $newNode = this.getNewNode($node, newVNode);
    //   return $newNode;
    // }

    this.updateAttrs($node, vNode.attrs, newVNode.attrs);
    this.updateChildren($node, vNode.children, newVNode.children);

    return $node;
  },

  recycleNode($node) {
    const tag = $node.nodeName.toLowerCase();

    return this.createVNode(tag, {}, []);
  },

  update(component, node) {
    let $node = node;

    if (!$node.instance) {
      $node.instance = component;
      $node.instance.el = $node;
    }

    const vNode = $node.v || this.recycleNode($node);
    const newVNode = $node.instance.getVNode();

    $node = this.updateNode($node, vNode, newVNode);

    $node.v = newVNode;

    // console.log(vNode);
    // console.log(newVNode);
    console.log($node.instance);

    return $node;
  },
};

export default vDom;
