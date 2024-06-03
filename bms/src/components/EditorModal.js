import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import { EditorBuffer } from "./EditorBuffer";

export const EditorModal = ({ isOpen, onClose, selectedMail, updateMail }) => {
  if (!isOpen) {
    return null;
  }
  if (selectedMail === undefined) {
    toast.error("메일을 확인할 수 없습니다.");
    return null;
  }
  const { id, title, content } = selectedMail;

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
        <EditorBuffer
          id={id}
          currentTitle={title}
          currentContent={content}
          updateMail={updateMail}
        />
      </div>
    </div>,
    document.getElementById("modal-editor"),
  );
};
