import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "../axiosConfig"; // axiosConfig에서 설정한 axios 인스턴스를 사용합니다.
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
      setIsResAndSendClicked(false);
      return;
    }
    if (mail.trim().length === 0) {
      toast.error("메일 본문을 확인해주세요.");
      setIsResAndSendClicked(false);
      return;
    }
    axios
      .post("/mail", {
        title: title,
        content: mail,
      })
      .then((r) => {
        toast.success(`${r.data.data.id}으로 등록 완료`);
        toast("메일 전송 요청을 보냈습니다.");
        const cleanup = () => {
          // setMail("");
          // setTitle("");
        };
        sendMail(r.data.data.id, cleanup);
      })
      .catch((e) =>
        toast.error(e.response?.data?.message ?? "메일 등록 요청 실패"),
      );
    setIsResAndSendClicked(false);
  }, [isResAndSendClicked, mail, title, sendMail]);

  useEffect(() => console.log(mail), [mail]);

  useEffect(() => {
    if (!isRegisterClicked) {
      return;
    }
    if (title.trim().length === 0) {
      toast.error("제목을 확인해주세요.");
      setIsRegisterClicked(false);
      return;
    }
    if (mail.trim().length === 0) {
      toast.error("메일 본문을 확인해주세요.");
      setIsRegisterClicked(false);
      return;
    }
    axios
      .post("/mail", {
        title: title,
        content: mail,
      })
      .then((r) => {
        toast.success(`메일이 등록되었습니다.`);
        setMail("");
        setTitle("");
      })
      .catch((e) =>
        toast.error(e.response?.data?.message ?? "메일 등록 요청 실패"),
      );
    setIsRegisterClicked(false);
  }, [isRegisterClicked, mail, title]);

  return { setTitle, setMail, setIsRegisterClicked, setIsResAndSendClicked };
};