import { TextEditor } from "./text editor/TextEditor";
import "ress";
import { UserList } from "./user list/UserList";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useRegisterMail } from "./hooks/useRegisterMail";
import { MailModal } from "./components/MailModal";
import { useGetMails } from "./hooks/useGetMails";
import { EditorModal } from "./components/EditorModal";

function App() {
  const { setTitle, setMail, setIsRegisterClicked, setIsResAndSendClicked } =
    useRegisterMail();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMailId, setSelectedMailId] = useState(-1);
  const { mails, deleteMail, updateMail } = useGetMails(isModalOpen);
  return (
    <div className="App">
      <Toaster />
      <UserList noRerender="noRerender" />
      <TextEditor
        setTitle={setTitle}
        setMail={setMail}
        setIsRegisterClicked={setIsRegisterClicked}
        setIsModalOpen={setIsModalOpen}
        setIsResAndSendClicked={setIsResAndSendClicked}
      />
      <MailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mails={mails}
        deleteMail={deleteMail}
        setSelectedMailId={setSelectedMailId}
      />
      <EditorModal
        isOpen={mails.length > 0 && selectedMailId !== -1}
        onClose={() => setSelectedMailId(-1)}
        selectedMail={
          mails.length > 0
            ? mails.find((mail) => mail.id === selectedMailId)
            : undefined
        }
        updateMail={updateMail}
      />
    </div>
  );
}

export default App;
