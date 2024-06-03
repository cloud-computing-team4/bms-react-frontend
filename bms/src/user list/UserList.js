import { FixedSizeList } from "react-window";
import "./userList.css";
import { memo, useState } from "react";
import { useUserList } from "../hooks/useUserList";
import { Form } from "../components/Form";

const LoadedUserList = ({ userList, action }) => {
  const { deleteUser, changeEmail } = action;
  return (
    <FixedSizeList
      height={200}
      itemData={userList}
      itemCount={userList?.length}
      itemSize={70}
      width={800}
    >
      {({ data, index, style, isScrolling }) => {
        const name = data[index].name;
        return (
          <div
            className={index % 2 ? "ListItemOdd" : "ListItemEven"}
            style={style}
          >
            {isScrolling ? (
              "loading"
            ) : (
              <>
                <p>
                  Name: {name} <br /> Email: {data[index].email}
                </p>
                <div className="ListItemButtonWrap">
                  <button
                    className="innerButton"
                    onClick={() => deleteUser(name)}
                  >
                    삭제
                  </button>
                  <button
                    className="innerButton"
                    onClick={() => changeEmail(name)}
                  >
                    수정
                  </button>
                </div>
              </>
            )}
          </div>
        );
      }}
    </FixedSizeList>
  );
};

export const UserList = memo(({ noRerender }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { userList, action } = useUserList(setIsLoaded);
  console.log("rendering list?");

  return (
    <>
      <Form addUser={action.addUser} />
      <div className="userList__Warp">
        {isLoaded ? (
          <LoadedUserList userList={userList} action={action} />
        ) : (
          <div>loading. . .</div>
        )}
      </div>
    </>
  );
});
