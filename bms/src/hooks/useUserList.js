import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const useUserList = (setIsLoaded) => {
  const [userList, setUserList] = useState([]);

  const addUser = useCallback((userData) => {
    axios
      .post("/user", userData)
      .then((r) => {
        toast.success(r.data);
        setUserList((prev) => [...prev, userData]);
      })
      .catch((e) => toast.error(e.response.message ?? "구독자 추가 요청 실패"));
  }, []);

  const deleteUser = useCallback((name) => {
    axios
      .delete(`/user/${name}`)
      .then((r) => {
        toast.success(r.data);
        setUserList((prev) => prev.filter((user) => user.name !== name));
      })
      .catch((e) => toast.error(e.response.message ?? "구독자 삭제 요청 실패"));
  }, []);

  const changeEmail = useCallback((name) => {
    const newEmail = prompt("new email: ");
    if (!prompt(`${newEmail}이 맞나요?`)) return;
    axios
      .patch(`user/${name}`, {
        email: newEmail,
      })
      .then((r) => {
        toast.success(r.data);
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
        toast.error(e.response.message ?? "구독자 이메일 변경 요청 실패"),
      );
  }, []);

  useEffect(() => {
    if (userList.length !== 0) {
      console.log("setIsLoaded TRUE");
      // setIsLoaded((prev) => !prev);
      setIsLoaded(true);
      return;
    }

    axios
      .get("/users")
      .then((res) => {
        setUserList(
          (res.data?.userDtos ?? []).map((dto) => ({
            ...dto,
            action: {
              deleteUser: deleteUser,
              changeEmail: changeEmail,
            },
          })),
        );
      })
      .catch((e) => {
        toast.error("구독자 목록 조회 실패");
        toast.success("use mock user");
        const mockUsers = [];
        for (let i = 1; i < 10_000 + 1; i++) {
          mockUsers.push({
            name: `user ${i}`,
            email: `user${i}@email.com`,
          });
        }

        setUserList(mockUsers);
      });
  }, [userList, setIsLoaded]);
  return {
    userList,
    action: {
      addUser: addUser,
      deleteUser: deleteUser,
      changeEmail: changeEmail,
    },
  };
};
