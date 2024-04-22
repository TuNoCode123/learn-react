import { getDefaultNormalizer } from "@testing-library/react";
import React, { useState } from "react";
import logo from "../logo.svg";
const Mycomponent1 = (props) => {
  const [name, setName] = useState("tuphamDev");
  const [age, setAge] = useState(18);
  const handleOnChange = (event) => {
    setName(event.target.value);
  };
  const handleOnChange1 = (event) => {
    setAge(event.target.value);
  };
  const handleDefault = (event) => {
    event.preventDefault();
    props.addUser({
      id: Math.floor(Math.random() * 100 + 1),
      name,
      age,
    });
  };
  return (
    <div>
      my name is {name} and my age is {age}
      <form onSubmit={(event) => handleDefault(event)}>
        <label>name:</label>
        <input
          value={name}
          type="text"
          onChange={(event) => handleOnChange(event)}
        ></input>
        <label>age:</label>
        <input
          value={age}
          type="text"
          onChange={(event) => handleOnChange1(event)}
        ></input>
        <button>clickme</button>
      </form>
    </div>
  );
};
export default Mycomponent1;
