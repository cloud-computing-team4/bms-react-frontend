import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";

export const HTMLPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      // const editorStateJSON = editorState.toJSON();
      // console.log(JSON.stringify(editorStateJSON));

      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        console.log(htmlString);
      });
    });
  }, [editor]);

  return null;
};
