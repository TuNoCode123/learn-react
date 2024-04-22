import React, { useState } from "react";

const DisplayUser = (props) => {
  const [isAgree, setIsAgree] = useState(true);
  const handleClick = () => {
    setIsAgree(!isAgree);
  };
  const handldeDeleteUser = (id) => {
    props.deleteUser(id);
  };
  const { userState } = props;
  return (
    <div>
      <div onClick={() => handleClick()}>
        {isAgree ? "hide USER" : "ShowUser"}
      </div>
      {isAgree && (
        <div>
          {userState.map((data, index) => {
            if (data) {
              return (
                <div className={data.age < 20 ? "red" : "green"} key={index}>
                  <div>my name is {data.name}</div>
                  <div>and my age is {data.age}</div>
                  <button onClick={() => handldeDeleteUser(data.id)}>
                    delete
                  </button>
                  <hr></hr>
                </div>
              );
            }
          })}
        </div>
      )}
    </div>
  );
};
export default DisplayUser;
