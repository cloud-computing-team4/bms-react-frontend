import { HeadingNode } from "@lexical/rich-text";

const marginBottom = {
  h1: "1em",
  h2: "1em",
  h3: "1em",
  h4: "1em",
  h5: "1em",
  h6: "1em",
};

export class StyledHeadingNode extends HeadingNode {
  constructor(tag, key) {
    super(tag, key);
  }

  static getType() {
    return "inline-style-heading";
  }

  static clone(node) {
    return new StyledHeadingNode(node.__tag, node.__key);
  }

  static importJSON(node) {
    return HeadingNode.importJSON(node);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "inline-style-heading",
      version: 1,
    };
  }

  createDOM(config) {
    const dom = super.createDOM(config);
    // dom.style.margin = `0 0 ${marginBottom[this.__tag]} 0`;
    dom.style.margin = `0 0 14px 0`;

    return dom;
  }

  exportDOM(editor) {
    const dom = super.exportDOM(editor);
    const node = dom.element;
    // node.style.margin = `0 0 ${marginBottom[this.__tag]} 0`;
    node.style.margin = `0 0 14px 0`;

    return dom;
  }

  updateDOM(prevNode, dom) {
    return super.updateDOM(prevNode, dom);
  }

  getTag() {
    return super.getTag();
  }
}

export function $createStyledHeadingNode(tag) {
  return new StyledHeadingNode(tag);
}

export function $isStyledHeadingNode(node) {
  return node instanceof StyledHeadingNode;
}
