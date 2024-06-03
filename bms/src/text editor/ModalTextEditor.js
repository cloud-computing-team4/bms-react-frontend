// export const ModalTextEditor = () => {
//
// }

import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { BasicPlugin } from "./plugins/BasicPlugin";
import { TextAlignPlugin } from "./plugins/TextAlignPlugin";
import { BlockPlugin } from "./plugins/BlockPlugin";
import { HTMLPlugin } from "./plugins/HTMLPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { SHORTCUTS } from "./plugins/shortcuts";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
import { ListMaxIndentLevelPlugin } from "./plugins/ListMaxIndentLevelPlugin";
import { DraggableBlockPlugin } from "./plugins/DraggableBlockPlugin";
import { memo, useState } from "react";
import "./textEditor.css";
import { editorConfig } from "./TextEditor";
import { LoadContentEditorPlugIn } from "./plugins/LoadContentEditorPlugIn";

export const ModalTextEditor = memo(
  ({
    setMail,
    setTitle,
    originalContent,
    originalTitle,
    setIsUpdateButtonClicked,
  }) => {
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
                value={originalTitle}
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
            <LoadContentEditorPlugIn mail={originalContent} />
          </div>
          <div className="mailButtonsWrap">
            <button
              type="button"
              className="innerButton"
              onClick={() => setIsUpdateButtonClicked(true)}
            >
              수정사항 저장하기
            </button>
          </div>
        </div>
      </LexicalComposer>
    );
  },
);
