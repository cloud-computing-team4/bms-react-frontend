import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { BasicPlugin } from "./plugins/BasicPlugin";
import { EditorTheme } from "../EditorTheme";
import "./textEditor.css";
import { TextAlignPlugin } from "./plugins/TextAlignPlugin";
import { BlockPlugin } from "./plugins/BlockPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { HTMLPlugin } from "./plugins/HTMLPlugin";
import { CodeNode } from "@lexical/code";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { StyledTextNode } from "./nodes/StyledTextNode";
import { ParagraphNode, TextNode } from "lexical";
import { StyledParagraphNode } from "./nodes/StyledParagraphNode";
import { StyledQuoteNode } from "./nodes/StyledQuoteNode";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { StyledListNode } from "./nodes/StyledListNode";
import { StyledHeadingNode } from "./nodes/StyledHeadingNode";
import { SHORTCUTS } from "./plugins/shortcuts";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import ListMaxIndentLevelPlugin from "./plugins/ListMaxIndentLevelPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";

const onError = (error) => {
  console.error(error);
};

const editorConfig = {
  namespace: "bms",
  nodes: [
    HorizontalRuleNode,
    CodeNode,
    LinkNode,
    ListItemNode,
    HeadingNode,
    QuoteNode,
    StyledTextNode,
    {
      replace: TextNode,
      with: (node) => new StyledTextNode(node.__text),
    },
    StyledHeadingNode,
    {
      replace: HeadingNode,
      with: (node) => new HeadingNode(node.__tag),
    },
    StyledParagraphNode,
    {
      replace: ParagraphNode,
      with: () => new StyledParagraphNode(),
    },
    StyledQuoteNode,
    {
      replace: QuoteNode,
      with: () => new StyledQuoteNode(),
    },
    StyledListNode,
    {
      replace: ListNode,
      with: (node) => new StyledListNode(node.__listType, node.__value),
    },
    // StyledListItemNode,
    // {
    //   replace: ListItemNode,
    //   with: (node) => new StyledListItemNode(node.__value, node.__checked),
    // },
  ],
  onError,
  theme: EditorTheme,
};

export const TextEditor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <BasicPlugin />
        <TextAlignPlugin />
        <BlockPlugin />
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
          <MarkdownShortcutPlugin transformers={SHORTCUTS} />
          <ListPlugin />
          <TabIndentationPlugin />
          <ListMaxIndentLevelPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
};
