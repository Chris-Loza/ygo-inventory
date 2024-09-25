import "./App.css";
import Homepage from "./components/homepage/Homepage";
import Login from "./components/login/Login";
import Notifications from "./components/notifications/Notifications";

function App() {
  return (
    <>
      <div className="container">
        <Homepage />
        {/* <Login /> */}
        <Notifications />
      </div>
    </>
  );
}

export default App;
