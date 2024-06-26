import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { BasicPlugin } from "./plugins/BasicPlugin";
import { EditorTheme } from "../EditorTheme";
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
import { ListMaxIndentLevelPlugin } from "./plugins/ListMaxIndentLevelPlugin";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { DraggableBlockPlugin } from "./plugins/DraggableBlockPlugin";
import { memo, useState } from "react";
import "./textEditor.css";

const onError = (error) => {
  console.error(error);
};

export const editorConfig = {
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
  ],
  onError,
  theme: EditorTheme,
};

export const TextEditor = memo(
  ({
    setTitle,
    setMail,
    setIsRegisterClicked,
    setIsModalOpen,
    setIsResAndSendClicked,
  }) => {
    console.log("does it render?");
    const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);

    const onRef = (_floatingAnchorElem) => {
      if (_floatingAnchorElem !== null) {
        setFloatingAnchorElem(_floatingAnchorElem);
      }
    };

    return (
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <div className="editor-wrap">
            <label htmlFor="title" className="titleInput">
              제목:{" "}
              <input
                id="title"
                type="text"
                placeholder="title"
                title="enter title!"
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>
          <BasicPlugin />
          <TextAlignPlugin />
          <BlockPlugin />
          <div className="editor-inner" ref={onRef}>
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={
                <div className="editor-placeholder">
                  Enter some rich text...
                </div>
              }
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <AutoFocusPlugin />
            <HTMLPlugin setMail={setMail} />
            <MarkdownShortcutPlugin transformers={SHORTCUTS} />
            <ListPlugin />
            <TabIndentationPlugin />
            <ListMaxIndentLevelPlugin />
            {floatingAnchorElem && (
              <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
            )}
          </div>
          <div className="mailButtonsWrap">
            <button
              type="button"
              className="innerButton"
              onClick={() => setIsRegisterClicked(true)}
            >
              작성한 메일 등록하기
            </button>
            <button
              type="button"
              className="innerButton"
              onClick={() => setIsResAndSendClicked(true)}
            >
              작성한 메일 등록 및 전송
            </button>
            <button
              type="button"
              className="innerButton"
              onClick={() => setIsModalOpen(true)}
            >
              전체 메일 조회하기
            </button>
          </div>
        </div>
      </LexicalComposer>
    );
  },
);
