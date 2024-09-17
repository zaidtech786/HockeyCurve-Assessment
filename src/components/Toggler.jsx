import React, { useContext } from "react";
import "../Styles/Toggler.css";
import "../Styles/Main.css";
import { AppContext } from "../GlobalState/Context";


const TogglerSwitch = () => {
  const {isOn, setIsOn} = useContext(AppContext);

  const toggleSwitch = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="toggle-container">
      <div
        className={`toggle-switch ${isOn ? "on" : "off"}`}
        onClick={toggleSwitch}
      >
        <div className="toggle-knob"></div>
      </div>
      <span>{isOn ? "ON" : "OFF"}</span>
    </div>
  );
};

export default TogglerSwitch;
