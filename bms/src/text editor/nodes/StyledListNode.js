import { ListNode } from "@lexical/list";

export class StyledListNode extends ListNode {
  constructor(listType, start = 1, key) {
    super(listType, start, key);
  }

  static getType() {
    return "inline-style-list";
  }

  static clone(node) {
    return new StyledListNode(node.__listType, node.__start, node.__key);
  }

  static importJSON(node) {
    return ListNode.importJSON(node);
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "inline-style-list",
      version: 1,
    };
  }

  getListType() {
    return super.getListType();
  }

  createDOM(config, editor) {
    const dom = super.createDOM(config);
    dom.style.padding = "0";
    dom.style.margin = "0 0 10px 16px";

    return dom;
  }

  exportDOM(editor) {
    const dom = super.exportDOM(editor);
    const node = dom.element;
    node.style.padding = "0";
    node.style.margin = "0 0 10px 16px";

    return dom;
  }
}

export function $createStyledListNode(listType) {
  return new StyledListNode(listType);
}

export function $isStyledListNode(node) {
  return node instanceof StyledListNode;
}
