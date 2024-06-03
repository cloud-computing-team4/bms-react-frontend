import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useSendMail = () => {
  const sendMail = useCallback((id, cleanup = undefined) => {
    axios
      .get(`bulk-mail/${id}`)
      .then((r) => {
        toast.success(r.data);
        if (cleanup) {
          cleanup();
        }
      })
      .catch((r) => {
        toast.error(r.response.data ?? "메일 전송 요청 실패");
      });
  }, []);

  return { sendMail };
};
