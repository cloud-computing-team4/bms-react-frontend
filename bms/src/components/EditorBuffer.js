import { useEffect, useState } from "react";
import { ModalTextEditor } from "../text editor/ModalTextEditor";

export const EditorBuffer = ({
  id,
  currentContent,
  currentTitle,
  updateMail,
}) => {
  const [mail, setMail] = useState(currentContent);
  const [title, setTitle] = useState(currentTitle);
  const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false);

  useEffect(() => {
    if (isUpdateButtonClicked) {
      updateMail(id, title, mail);
    }
  }, [isUpdateButtonClicked]);
  return (
    <ModalTextEditor
      id={id}
      setMail={setMail}
      setTitle={setTitle}
      originalContent={currentContent}
      originalTitle={currentTitle}
      setIsUpdateButtonClicked={setIsUpdateButtonClicked}
    />
  );
};
