import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  $createParagraphNode,
  $getSelection,
  $isRangeSelection,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createStyledQuoteNode } from "../nodes/StyledQuoteNode";
import {
  $isListNode,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
} from "@lexical/list";
import { $getNearestNodeOfType } from "@lexical/utils";
import {
  $createStyledHeadingNode,
  $isStyledHeadingNode,
} from "../nodes/StyledHeadingNode";
// import { $isStyledListNode, StyledListNode } from "../nodes/StyledListNode";

const BlockType = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  quote: "quote",
  ordered: "number",
  unordered: "bullet",
};

export const BlockPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [blockType, setBlockType] = useState(BlockType.paragraph);

  const setHeading = useCallback(
    (type) => {
      if (blockType !== type) {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () =>
              type === BlockType.paragraph
                ? $createParagraphNode()
                : // : $createHeadingNode(type),
                  $createStyledHeadingNode(type),
            );
          }
        });
      }
    },
    [blockType, editor],
  );

  const setQuote = useCallback(() => {
    if (blockType !== BlockType.quote) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $setBlocksType(selection, () => $createStyledQuoteNode());
        }
      });
    }
  }, [blockType, editor]);

  const setOrderedList = useCallback(() => {
    if (blockType !== BlockType.ordered) {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  const setUnorderedList = useCallback(() => {
    if (blockType !== BlockType.unordered) {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    }
  }, [blockType, editor]);

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const selection = $getSelection();

        if (!$isRangeSelection(selection)) return;

        const anchorNode = selection.anchor.getNode();
        const targetNode =
          anchorNode.getKey() === "root"
            ? anchorNode
            : anchorNode.getTopLevelElementOrThrow();

        if ($isStyledHeadingNode(targetNode)) {
          setBlockType(targetNode.getTag());
          return;
        }

        if ($isListNode(targetNode)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const listType = parentList
            ? parentList.getListType()
            : targetNode.getListType();

          setBlockType(listType);
          return;
        }

        const nodeType = targetNode.getType();

        if (nodeType in BlockType) {
          setHeading(nodeType);
          return;
        }

        setBlockType(BlockType.paragraph);
      });
    });
  }, [editor, setHeading]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        onClick={() => {
          setHeading(BlockType.paragraph);
        }}
        className={"toolbar-item spaced "}
        aria-label="p"
      >
        <i className="format paragraph" />
      </button>
      <button
        onClick={() => {
          setHeading("h1");
        }}
        className={
          "toolbar-item spaced " + (blockType === BlockType.h1 ? "active" : "")
        }
        aria-label="H1"
      >
        <i className="format h1" />
      </button>
      <button
        onClick={() => {
          setHeading("h2");
        }}
        className={
          "toolbar-item spaced " + (blockType === BlockType.h2 ? "active" : "")
        }
        aria-label="H2"
      >
        <i className="format h2" />
      </button>
      <button
        onClick={() => {
          setHeading("h3");
        }}
        className={
          "toolbar-item spaced " + (blockType === BlockType.h3 ? "active" : "")
        }
        aria-label="H3"
      >
        <i className="format h3" />
      </button>
      <button
        onClick={() => {
          setHeading("h4");
        }}
        className={
          "toolbar-item spaced " + (blockType === BlockType.h4 ? "active" : "")
        }
        aria-label="H4"
      >
        <i className="format h4" />
      </button>
      <button
        onClick={() => {
          setHeading("h5");
        }}
        className={
          "toolbar-item spaced " + (blockType === BlockType.h5 ? "active" : "")
        }
        aria-label="H5"
      >
        <i className="format h5" />
      </button>
      <button
        onClick={() => {
          setHeading("h6");
        }}
        className={
          "toolbar-item spaced " + (blockType === BlockType.h6 ? "active" : "")
        }
        aria-label="H6"
      >
        <i className="format h6" />
      </button>
      <button
        onClick={() => {
          setQuote();
        }}
        className={
          "toolbar-item spaced " +
          (blockType === BlockType.quote ? "active" : "")
        }
        aria-label="Quote"
      >
        <i className="format quote" />
      </button>
      <button
        onClick={() => {
          setOrderedList();
        }}
        className={
          "toolbar-item spaced " +
          (blockType === BlockType.ordered ? "active" : "")
        }
        aria-label="Number"
      >
        <i className="format ordered" />
      </button>
      <button
        onClick={() => {
          setUnorderedList();
        }}
        className={
          "toolbar-item spaced " +
          (blockType === BlockType.unordered ? "active" : "")
        }
        aria-label="Bullet"
      >
        <i className="format unordered" />
      </button>
    </div>
  );
};
