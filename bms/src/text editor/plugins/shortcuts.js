import { $isHeadingNode, HeadingNode, QuoteNode } from "@lexical/rich-text";
import { $createStyledHeadingNode } from "../nodes/StyledHeadingNode";
import {
  $createStyledQuoteNode,
  $isStyledQuoteNode,
} from "../nodes/StyledQuoteNode";
import { $createLineBreakNode } from "lexical";
import {
  $createListItemNode,
  $createListNode,
  $isListItemNode,
  $isListNode,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import { $isStyledListNode } from "../nodes/StyledListNode";

// const HIGHLIGHT = {
//   format: ["highlight"],
//   tag: "==",
//   type: "text-format",
// };
//
// const BOLD_ITALIC_STAR = {
//   format: ["bold", "italic"],
//   tag: "***",
//   type: "text-format",
// };
//
// const BOLD_ITALIC_UNDERSCORE = {
//   format: ["bold", "italic"],
//   intraword: false,
//   tag: "___",
//   type: "text-format",
// };
//
// const BOLD_STAR = {
//   format: ["bold"],
//   tag: "**",
//   type: "text-format",
// };
//
// const BOLD_UNDERSCORE = {
//   format: ["bold"],
//   intraword: false,
//   tag: "__",
//   type: "text-format",
// };
//
// const STRIKETHROUGH = {
//   format: ["strikethrough"],
//   tag: "~~",
//   type: "text-format",
// };
//
// const ITALIC_STAR = {
//   format: ["italic"],
//   tag: "*",
//   type: "text-format",
// };
//
// const ITALIC_UNDERSCORE = {
//   format: ["italic"],
//   intraword: false,
//   tag: "_",
//   type: "text-format",
// };

const LIST_INDENT_SIZE = 4;

const createBlockNode = (createNode) => {
  return (parentNode, children, match) => {
    const node = createNode(match);
    node.append(...children);
    parentNode.replace(node);
    node.select(0, 0);
  };
};

const getIndent = (whitespaces) => {
  const tabs = whitespaces.match(/\t/g);
  const spaces = whitespaces.match(/ /g);

  let indent = 0;

  if (tabs) {
    indent += tabs.length;
  }

  if (spaces) {
    indent += Math.floor(spaces.length / LIST_INDENT_SIZE);
  }

  return indent;
};

const listReplace = (listType) => {
  return (parentNode, children, match) => {
    const previousNode = parentNode.getPreviousSibling();
    const nextNode = parentNode.getNextSibling();
    const listItem = $createListItemNode(
      listType === "check" ? match[3] === "x" : undefined,
    );
    if ($isListNode(nextNode) && nextNode.getListType() === listType) {
      const firstChild = nextNode.getFirstChild();
      if (firstChild !== null) {
        firstChild.insertBefore(listItem);
      } else {
        nextNode.append(listItem);
      }
      parentNode.remove();
    } else if (
      $isListNode(previousNode) &&
      previousNode.getListType() === listType
    ) {
      previousNode.append(listItem);
      parentNode.remove();
    } else {
      const list = $createListNode(
        listType,
        listType === "number" ? Number(match[2]) : undefined,
      );
      list.append(listItem);
      parentNode.replace(list);
    }
    listItem.append(...children);
    listItem.select(0, 0);
    const indent = getIndent(match[1]);
    if (indent) {
      listItem.setIndent(indent);
    }
  };
};

const listExport = (listNode, exportChildren, depth) => {
  const output = [];
  const children = listNode.getChildren();
  let index = 0;
  for (const listItemNode of children) {
    if ($isListItemNode(listItemNode)) {
      if (listItemNode.getChildrenSize() === 1) {
        const firstChild = listItemNode.getFirstChild();
        if ($isListNode(firstChild)) {
          output.push(listExport(firstChild, exportChildren, depth + 1));
          continue;
        }
      }
      const indent = " ".repeat(depth * LIST_INDENT_SIZE);
      const listType = listNode.getListType();
      const prefix =
        listType === "number"
          ? `${listNode.getStart() + index}. `
          : listType === "check"
            ? `- [${listItemNode.getChecked() ? "x" : " "}] `
            : "- ";
      output.push(indent + prefix + exportChildren(listItemNode));
      index++;
    }
  }

  return output.join("\n");
};

const HEADING = {
  dependencies: [HeadingNode],
  export: (node, exportChildren) => {
    if (!$isHeadingNode(node)) {
      return null;
    }
    const level = Number(node.getTag().slice(1));
    return "#".repeat(level) + " " + exportChildren(node);
  },
  regExp: /^(#{1,6})\s/,
  replace: createBlockNode((match) => {
    const tag = "h" + match[1].length;
    return $createStyledHeadingNode(tag);
  }),
  type: "element",
};

const QUOTE = {
  dependencies: [QuoteNode],
  export: (node, exportChildren) => {
    if (!$isStyledQuoteNode(node)) {
      return null;
    }

    const lines = exportChildren(node).split("\n");
    const output = [];
    for (const line of lines) {
      output.push("> " + line);
    }
    return output.join("\n");
  },
  regExp: /^>\s/,
  replace: (parentNode, children, _match, isImport) => {
    if (isImport) {
      const previousNode = parentNode.getPreviousSibling();
      if ($isStyledQuoteNode(previousNode)) {
        previousNode.splice(previousNode.getChildrenSize(), 0, [
          $createLineBreakNode(),
          ...children,
        ]);
        previousNode.select(0, 0);
        parentNode.remove();
        return;
      }
    }

    const node = $createStyledQuoteNode();
    node.append(...children);
    parentNode.replace(node);
    node.select(0, 0);
  },
  type: "element",
};

const UNORDERED_LIST = {
  dependencies: [ListNode, ListItemNode],
  export: (node, exportChildren) => {
    return $isStyledListNode(node) ? listExport(node, exportChildren, 0) : null;
  },
  regExp: /^(\s*)[-*+]\s/,
  replace: listReplace("bullet"),
  type: "element",
};

const ORDERED_LIST = {
  dependencies: [ListNode, ListItemNode],
  export: (node, exportChildren) => {
    return $isStyledListNode(node) ? listExport(node, exportChildren, 0) : null;
  },
  regExp: /^(\s*)(\d{1,})\.\s/,
  replace: listReplace("number"),
  type: "element",
};

export const SHORTCUTS = [
  HEADING,
  QUOTE,
  UNORDERED_LIST,
  ORDERED_LIST,
  // HIGHLIGHT,
  // BOLD_ITALIC_STAR,
  // BOLD_ITALIC_UNDERSCORE,
  // BOLD_STAR,
  // BOLD_UNDERSCORE,
  // STRIKETHROUGH,
  // ITALIC_STAR,
  // ITALIC_UNDERSCORE,
];
