import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useGetMails = (isModalOpen) => {
  const [mails, setMails] = useState([]);

  const deleteMail = useCallback((id) => {
    axios
      .delete(`mail/${id}`)
      .then((r) => {
        toast.success(r.data);
        setMails((prev) => prev.filter((mail) => mail.id !== id));
      })
      .catch((e) => {
        toast.error(e.response.message ?? "메일 삭제 요청 실패");
      });
  }, []);

  const updateMail = useCallback((id, title, content) => {
    axios
      .patch(`mail/${id}`, {
        title: title,
        content: content,
      })
      .then((r) => {
        toast.success(r.data);
        setMails((prev) =>
          prev.map((mail) => {
            if (mail.id === id) {
              return {
                id: id,
                title: title,
                content: content,
              };
            }
            return mail;
          }),
        );
      })
      .catch((e) => {
        toast.error(e.response.status ?? "메일 수정 요청 실패");
      });
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    if (mails.length === 0) {
      axios
        .get(`/mails`)
        .then((r) => {
          toast.success(r.data.length + "개 불러오기 성공");
          setMails(r.data);
        })
        .catch((e) => {
          toast.error(e.response.message ?? "전체 메일 불러오기 요청 실패");
          toast.success("using mock mails");
          const mockMails = [
            {
              id: 1,
              title: "dummy1",
              content:
                '<ul style="padding: 0px; margin: 8px 32px;"><li value="1"><span style="white-space: pre-wrap;">안녕하세요</span></li><li value="2" class="nested"><ul style="padding: 0px; margin: 8px 32px;"><li value="1"><span style="white-space: pre-wrap;">감사해요</span></li></ul></li></ul>',
            },
            {
              id: 2,
              title: "dummy2",
              content:
                '<ul style="padding: 0px; margin: 8px 32px;"><li value="1"><span style="white-space: pre-wrap;">​잘있어요</span></li><li value="2" class="nested"><ul style="padding: 0px; margin: 8px 32px;"><li value="1"><code spellcheck="false" style="white-space: pre-wrap;"><span class="editor-text-code">다시만나요</span></code></li></ul></li></ul>',
            },
          ];
          setMails(mockMails);
        });
    }
  }, [isModalOpen]);

  return { mails, deleteMail, updateMail };
};
