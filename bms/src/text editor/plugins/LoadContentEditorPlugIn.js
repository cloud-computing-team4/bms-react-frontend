import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $generateNodesFromDOM } from "@lexical/html";
import { useEffect } from "react";
import { $getRoot, $getSelection } from "lexical";

export const LoadContentEditorPlugIn = ({ mail }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.update(() => {
      const parser = new DOMParser();
      const dom = parser.parseFromString(mail, "text/html");
      const nodes = $generateNodesFromDOM(editor, dom);
      $getRoot().select();
      const selection = $getSelection();
      selection.insertNodes(nodes);
    });
  }, [editor]);

  return null;
};
