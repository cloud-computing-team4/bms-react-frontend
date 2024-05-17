import { QuoteNode } from "@lexical/rich-text";

export class StyledQuoteNode extends QuoteNode {
  constructor(key) {
    super(key);
  }

  static getType() {
    return "inline-style-quote";
  }

  static clone(node) {
    return new StyledQuoteNode(node.__key);
  }

  static importJSON(node) {
    return QuoteNode.importJSON(node);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "inline-style-quote",
      version: 1,
    };
  }

  createDOM(config) {
    const dom = super.createDOM(config);

    dom.style.margin = "0 0 10px 20px";
    dom.style.fontSize = "1em";
    dom.style.color = "gb(101, 103, 107)";
    dom.style.borderLeftColor = "rgb(206, 208, 212)";
    dom.style.borderLeftWidth = "4px";
    dom.style.borderLeftStyle = "solid";
    dom.style.paddingLeft = "16px";

    return dom;
  }

  exportDOM(editor) {
    const dom = super.exportDOM(editor);
    const node = dom.element;

    node.style.margin = "0 0 10px 20px";
    node.style.fontSize = "1em";
    node.style.color = "gb(101, 103, 107)";
    node.style.borderLeftColor = "rgb(206, 208, 212)";
    node.style.borderLeftWidth = "4px";
    node.style.borderLeftStyle = "solid";
    node.style.paddingLeft = "16px";

    return dom;
  }
}

export function $createStyledQuoteNode() {
  return new StyledQuoteNode();
}

export function $isStyledQuoteNode(node) {
  return node instanceof StyledQuoteNode;
}
