import "../styles/styles.css";
import toast from "react-hot-toast";
import { memo } from "react";

export const Form = memo(({ addUser }) => {
  const ohSubmit = (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    if (name.trim().length === 0) {
      toast.error("이름을 확인해 주세요.");
      return;
    }

    const email = e.target[1].value;
    if (email.trim().length === 0 || !email.includes("@")) {
      toast.error("이메일을 확인해 주세요.");
      return;
    }

    addUser({
      name: name,
      email: email,
    });
  };
  return (
    <form className="form" onSubmit={ohSubmit}>
      이름:
      <input type="text" placeholder="name" />
      이메일:
      <input type="email" placeholder="email@email.com" />
      <button className="innerButton">목록에 추가</button>
    </form>
  );
});
