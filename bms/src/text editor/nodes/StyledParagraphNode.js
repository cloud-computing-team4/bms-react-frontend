import { ParagraphNode } from "lexical";

export class StyledParagraphNode extends ParagraphNode {
  __backgroundColor = "";

  constructor() {
    super();
  }

  static getType() {
    return "inline-style-paragraph";
  }

  static clone(node) {
    return new StyledParagraphNode(node.__key);
  }

  static importJSON(node) {
    return ParagraphNode.importJSON(node);
  }

  setBackgroundColor(backgroundColor) {
    this.__backgroundColor = backgroundColor;
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "inline-style-paragraph",
      version: 1,
    };
  }

  exportDOM(editor) {
    const dom = super.exportDOM(editor);
    const node = dom.element;
    node.style.display = "block";
    node.style.margin = "0 0 8px";
    node.style.position = "relative";
    // node.style.backgroundColor = this.__backgroundColor;

    return dom;
  }
}
