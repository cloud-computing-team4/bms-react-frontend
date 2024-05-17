import { $isTextNode, TextNode } from "lexical";

export class StyledTextNode extends TextNode {
  __color = "";
  __fontSize = "";
  __fontStyle = "";

  constructor(text, key) {
    super(text, key);
  }

  static getType() {
    return "inline-style-text";
  }

  static clone(node) {
    return new StyledTextNode(node.__text, node.__key);
  }

  static importDOM() {
    const importers = TextNode.importDOM();
    console.log("importDOM", importers);
    return {
      ...importers,
      code: () => ({
        conversion: patchStyleConversion(importers?.code),
        priority: 1,
      }),
      em: () => ({
        conversion: patchStyleConversion(importers?.em),
        priority: 1,
      }),
      span: () => ({
        conversion: patchStyleConversion(importers?.span),
        priority: 1,
      }),
      strong: () => ({
        conversion: patchStyleConversion(importers?.strong),
        priority: 1,
      }),
      sub: () => ({
        conversion: patchStyleConversion(importers?.sub),
        priority: 1,
      }),
      sup: () => ({
        conversion: patchStyleConversion(importers?.sup),
        priority: 1,
      }),
    };
  }

  static importJSON(node) {
    return TextNode.importJSON(node);
  }

  setColor(color) {
    this.__color = color;
  }

  setFontStyle(fontStyle) {
    this.__fontStyle = fontStyle;
  }

  setFontSize(fontSize) {
    this.__fontSize = fontSize;
  }

  createDOM(config, editor) {
    return super.createDOM(config, editor);
  }

  updateDOM(prevNode, dom, config) {
    return super.updateDOM(prevNode, dom, config);
  }

  isSimpleText() {
    return (
      (this.__type === "text" || this.__type === "inline-style-text") &&
      this.__mode === 0
    );
  }

  exportJSON() {
    return {
      ...super.exportJSON(),
      type: "inline-style-text",
      version: 1,
    };
  }

  exportDOM(editor) {
    const dom = super.exportDOM(editor);
    // const node = dom.element;
    // let inline = "";
    // inline += extractStyle(node);

    // const format = this.getFormat();
    //
    // if (format & 1) {
    //   // node.style.fontWeight = "bold";
    //   inline += "font-weight: bold; ";
    // }
    //
    // if (format & 2) {
    //   // node.style.fontStyle = "italic";
    //   inline += "font-style: italic; ";
    // }
    //
    // if (format & 4) {
    //   // node.style.textDecoration = "underline";
    //   inline += "text-decoration: underline; ";
    // } else if (format & 8) {
    //   // node.style.textDecoration = "line-through";
    //
    //   inline += "text-decoration: line-through; ";
    // }

    // if (style.length) {
    // node.style.cssText = inline;
    // }

    // node.className = "";

    return dom;
  }
}

export function $createStyledTextNode(text) {
  return new StyledTextNode(text);
}

export function $isStyledTextNode(node) {
  return node instanceof StyledTextNode;
}

function patchStyleConversion(originalDOMConverter) {
  return (node) => {
    console.log("patchStyle", node);
    const original = originalDOMConverter?.node;

    if (!original) return null;

    const originalOutput = original.conversion(node);

    if (!originalOutput) return originalOutput;

    const backgroundColor = node.style.backgroundColor;
    const color = node.style.color;
    const fontFamily = node.style.fontFamily;
    const fontSize = node.style.fontSize;
    const textDecoration = node.style.textDecoration;

    return {
      ...originalOutput,
      forChild: (lexicalNode, parent) => {
        const originalForChild = originalOutput?.forChild ?? ((x) => x);
        const result = originalForChild(lexicalNode, parent);

        if ($isTextNode(result)) {
          const style = [
            backgroundColor ? `background-color: ${backgroundColor}` : null,
            color ? `color: ${color}` : null,
            fontFamily ? `font-family: ${fontFamily}` : null,
            fontSize ? `font-size: ${fontSize}` : null,
            textDecoration ? `text-decoration: ${textDecoration}` : null,
          ]
            .filter((value) => value != null)
            .join("; ");

          if (style.length) {
            return result.setStyle(style);
          }
        }

        return result;
      },
    };
  };
}
