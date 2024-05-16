import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { BasicToolbarPlugin } from "./plugins/BasicToolbarPlugin";
import { EditorTheme } from "../EditorTheme";
import "./textEditor.css";
import { TextAlignPlugin } from "./plugins/TextAlignPlugin";
import { HeadingPlugin } from "./plugins/HeadingPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { HTMLPlugin } from "./plugins/HTMLPlugin";
import { CodeNode } from "@lexical/code";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

const onError = (error) => {
  console.error(error);
};

const editorConfig = {
  namespace: "bms",
  nodes: [CodeNode, HeadingNode, LinkNode, ListNode, ListItemNode, QuoteNode],
  onError,
  theme: EditorTheme,
};

export const TextEditor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <BasicToolbarPlugin />
        <TextAlignPlugin />
        <HeadingPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={
              <div className="editor-placeholder">Enter some rich text...</div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <HTMLPlugin />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
};
