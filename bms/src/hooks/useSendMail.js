import { useCallback } from "react";
import axios from "../axiosConfig"; // axiosConfig에서 설정한 axios 인스턴스를 사용합니다.
import toast from "react-hot-toast";

export const useSendMail = () => {
  const sendMail = useCallback((id, cleanup = undefined) => {
    axios
      .get(`/bulk-mail/${id}`)
      .then((r) => {
        toast.success(r.data.data); // 성공 메시지 처리
        if (cleanup) {
          cleanup();
        }
      })
      .catch((e) => {
        toast.error(e.response?.data?.message ?? "메일 전송 요청 실패"); // 에러 메시지 처리
      });
  }, []);

  return { sendMail };
};

// import { useCallback } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";
//
// export const useSendMail = () => {
//   const sendMail = useCallback((id, cleanup = undefined) => {
//     axios
//       .get(`bulk-mail/${id}`)
//       .then((r) => {
//         toast.success(r.data);
//         if (cleanup) {
//           cleanup();
//         }
//       })
//       .catch((r) => {
//         toast.error(r.response.data ?? "메일 전송 요청 실패");
//       });
//   }, []);
//
//   return { sendMail };
// };
