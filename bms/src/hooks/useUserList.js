import { useCallback, useEffect, useState } from "react";
import axios from "../axiosConfig";
import toast from "react-hot-toast";

export const useUserList = (setIsLoaded) => {
  const [userList, setUserList] = useState([]);

  const addUser = useCallback((userData) => {
    axios
      .post("/user", userData)
      .then((r) => {
        console.log(r.data.data);
        toast.success(r.data.data);
        setUserList((prev) => [...prev, userData]);
      })
      .catch((e) =>
        toast.error(e.response?.data?.message ?? "구독자 추가 요청 실패"),
      );
  }, []);

  const deleteUser = useCallback((name) => {
    axios
      .delete(`/user/${name}`)
      .then((r) => {
        toast.success(r.data.data);
        setUserList((prev) => prev.filter((user) => user.name !== name));
      })
      .catch((e) =>
        toast.error(e.response?.data?.message ?? "구독자 삭제 요청 실패"),
      );
  }, []);


  const changeEmail = useCallback((name) => {
    const newEmail = prompt("new email: ");
    if (!newEmail || !window.confirm(`${newEmail}이 맞나요?`)) return;
    axios
      .patch(`/user/${name}`, { email: newEmail })
      .then((r) => {
        toast.success(r.data.data);
        setUserList((prev) =>
          prev.map((user) => {
            if (user.name === name) {
              return {
                ...user,
                email: newEmail,
              };
            }
            return user;
          }),
        );
      })
      .catch((e) =>
        toast.error(
          e.response?.data?.message ?? "구독자 이메일 변경 요청 실패",
        ),
      );
  }, []);

  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setUserList(
          (res.data?.data ?? []).map((user) => ({
            name: user.name,
            email: user.email,
            action: {
              deleteUser: deleteUser,
              changeEmail: changeEmail,
            },
          })),
        );
        setIsLoaded(true);
      })
      .catch((e) => {
        toast.error("구독자 목록 조회 실패");
        toast.success("use mock user");
        const mockUsers = [];
        for (let i = 1; i <= 10000; i++) {
          mockUsers.push({
            name: `user ${i}`,
            email: `user${i}@email.com`,
          });
        }

        setUserList(mockUsers);
        setIsLoaded(true);
      });
  }, [deleteUser, changeEmail]);

  return {
    userList,
    action: {
      addUser,
      deleteUser,
      changeEmail,
    },
  };
};