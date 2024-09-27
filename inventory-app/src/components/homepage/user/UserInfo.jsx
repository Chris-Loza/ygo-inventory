import React, { useEffect, useState } from "react";
import "./userInfo.css";
import { auth, db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const UserInfo = () => {
  const [currentUser, setCurrentUser] = useState({});
  console.log(auth.currentUser.uid);

  useEffect(() => {
    if(!auth.currentUser) return;
    const fetchUserInfo = async (uid) => {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      console.log(docSnap.data());
      setCurrentUser(docSnap.data());
    };

    return () => {
      if(!auth.currentUser) return;
      fetchUserInfo(auth?.currentUser.uid);
    };
  }, [auth.currentUser]);

  console.log(currentUser);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "../../../images/UserIconNoFill.svg"} alt="User Icon" />
        <h3>{currentUser.username}</h3>
      </div>
      <button onClick={() => auth.signOut()}>Sign Out</button>
    </div>
  );
};

export default UserInfo;
