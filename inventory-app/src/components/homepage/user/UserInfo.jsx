import React from "react";
import "./userInfo.css";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="../../../images/UserIconNoFill.svg" alt="User Icon" />
        <h3>Username</h3>
      </div>
      <button>Sign Out</button>
    </div>
  );
};

export default UserInfo;
