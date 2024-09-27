import { useEffect, useState } from "react";
import "./App.css";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Notifications from "./components/notifications/Notifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(auth.currentUser);
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => {
      unSub();
    };
  }, [isLoggedIn]);

  return (
    <>
      <div className="container">
        {isLoggedIn ? <Homepage /> : <Login />}
        <Notifications />
      </div>
    </>
  );
}

export default App;
