import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { $getSelection, $isRangeSelection } from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { $createHeadingNode, $isHeadingNode } from "@lexical/rich-text";

const BlockType = {
  paragraph: "paragraph",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
};

export const HeadingPlugin = () => {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [blockType, setBlockType] = useState(BlockType.paragraph);

  const setHeading = useCallback(
    (type) => {
      if (blockType !== type) {
        editor.update(() => {
          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            $setBlocksType(selection, () => $createHeadingNode(type));
          }
        });
      }
    },
    [blockType, editor],
  );

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

        if ($isHeadingNode(targetNode)) {
          setBlockType(targetNode.getTag());
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
        aria-label="paragraph"
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
    </div>
  );
};
