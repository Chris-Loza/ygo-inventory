import React, { useEffect, useState } from "react";
import "./userInfo.css";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const UserInfo = () => {
  // const [currentUser, setCurrentUser] = useState({});
  // console.log(auth.currentUser.uid);

  // useEffect(() => {
  //   const fetchUserInfo = async (uid) => {
  //     const docRef = doc(db, "users", uid);
  //     const docSnap = await getDoc(docRef);

  //     console.log(docSnap.data());
  //     setCurrentUser(docSnap.data());
  //   };

  //   return () => {
  //     fetchUserInfo(auth?.currentUser.uid);
  //   };
  // }, [auth.currentUser]);

  // console.log(currentUser);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={"../../../images/UserIconNoFill.svg"} alt="User Icon" />
        <h3>username</h3>
      </div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};

export default UserInfo;
