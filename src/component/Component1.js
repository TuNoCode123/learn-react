import React, { useEffect, useState } from "react";
import Mycomponent1 from "./component2";
import DisplayUser from "./component3";
const Mycomponent = (props) => {
  const [listUser, setListUser] = useState([
    { id: 1, name: "tuphamDev", age: 20 },
    { id: 2, name: "tuphamDev1", age: 15 },
    { id: 3, name: "tuphamDev2", age: 22 },
  ]);
  const addUser = (user) => {
    setListUser([user, ...listUser]);
  };
  const deleteUser = (id) => {
    const copyArray = [...listUser];
    const newArray = copyArray.filter((data) => data.id != id);
    setListUser([...newArray]);
  };
  useEffect(() => {
    console.log("call me useEffect");
  });
  return (
    <div>
      <Mycomponent1 addUser={addUser} />
      <DisplayUser userState={listUser} deleteUser={deleteUser} />
    </div>
  );
};
export default Mycomponent;
