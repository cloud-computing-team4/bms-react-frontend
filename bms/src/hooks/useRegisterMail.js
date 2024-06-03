import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useSendMail } from "./useSendMail";

export const useRegisterMail = () => {
  const [title, setTitle] = useState("");
  const [mail, setMail] = useState("");
  const [isRegisterClicked, setIsRegisterClicked] = useState(false);
  const [isResAndSendClicked, setIsResAndSendClicked] = useState(false);
  const { sendMail } = useSendMail();

  useEffect(() => {
    if (!isResAndSendClicked) {
      return;
    }
    if (title.trim().length === 0) {
      toast.error("제목을 확인해주세요.");
      return;
    }
    if (mail.trim().length === 0) {
      toast.error("메일 본문을 확인해주세요.");
      return;
    }
    axios
      .post("/mail", {
        title: title,
        content: mail,
      })
      .then((r) => {
        toast.success(`${r.data}로 등록 완료`);
        const cleanup = () => {
          setMail("");
          setTitle("");
        };
        sendMail(r.data, cleanup);
      })
      .catch((e) => toast.error(e.response.message ?? "메일 등록 요청 실패"));
    setIsResAndSendClicked(false);
  }, [isResAndSendClicked, mail, title]);

  useEffect(() => console.log(mail), [mail]);

  useEffect(() => {
    if (!isRegisterClicked) {
      return;
    }
    if (title.trim().length === 0) {
      toast.error("제목을 확인해주세요.");
      return;
    }
    if (mail.trim().length === 0) {
      toast.error("메일 본문을 확인해주세요.");
      return;
    }
    axios
      .post("/mail", {
        title: title,
        content: mail,
      })
      .then((r) => {
        toast.success(r.data);
        setMail("");
        setTitle("");
      })
      .catch((e) => toast.error(e.response.message ?? "메일 등록 요청 실패"));
    setIsRegisterClicked(false);
  }, [isRegisterClicked, mail, title]);

  return { setTitle, setMail, setIsRegisterClicked, setIsResAndSendClicked };
};
