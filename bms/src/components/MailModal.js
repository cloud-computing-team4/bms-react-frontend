import { createPortal } from "react-dom";
import { memo, Suspense } from "react";

const Mail = memo(({ mail, deleteMail, setSelectedMailId }) => {
  return (
    <div className="Mail">
      <h3>{mail.title}</h3>
      <div dangerouslySetInnerHTML={{ __html: mail.content }} />
      <div className="buttonWrap">
        <button
          className="innerButton"
          type="button"
          onClick={() => deleteMail(mail.id)}
        >
          삭제
        </button>
        <button
          className="innerButton"
          type="button"
          onClick={() => setSelectedMailId(mail.id)}
        >
          수정
        </button>
      </div>
      <hr />
    </div>
  );
});

const MailList = ({ mails, deleteMail, setSelectedMailId }) => {
  return (
    <div className="MailList">
      <h2>전체 메일 목록</h2>
      {mails.map((mail) => {
        return (
          <Mail
            key={mail.id}
            mail={mail}
            deleteMail={deleteMail}
            setSelectedMailId={setSelectedMailId}
          />
        );
      })}
    </div>
  );
};

export const MailModal = ({
  isOpen,
  onClose,
  mails,
  deleteMail,
  setSelectedMailId,
}) => {
  if (!isOpen) {
    return null;
  }

  console.log(mails);

  return createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-button">
          Close
        </button>
        <Suspense fallback={<div>Loading...</div>}>
          <MailList
            mails={mails}
            deleteMail={deleteMail}
            setSelectedMailId={setSelectedMailId}
          />
        </Suspense>
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};
