import { ListItemNode } from "@lexical/list";

export class StyledListItemNode extends ListItemNode {
  constructor(value, checked, key) {
    super(value, checked, key);
  }

  static getType() {
    return "inline-style-list-item";
  }

  static clone(node) {
    return new StyledListItemNode(node.__value, node.__checked, node.__key);
  }

  static importJSON(node) {
    return ListItemNode.importJSON(node);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "inline-style-list-item",
      version: 1,
    };
  }

  createDOM(config) {
    const dom = super.createDOM(config);
    return dom;
  }

  exportDOM(editor) {
    const dom = super.exportDOM(editor);
    const node = dom.element;
    node.style.listStyleType = "none";
    return dom;
  }
}

export function $createStyledListItemNode(checked) {
  return new StyledListItemNode(checked);
}

export function $isStyledListItemNode(node) {
  return node instanceof StyledListItemNode;
}
