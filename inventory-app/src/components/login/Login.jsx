import React from "react";
import "./login.css";


const Login = () => {
  return (
    <div className="login">
      <div className="content">
        <h2>Sign In</h2>
        <form>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button>Sign In</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="content">
        <h2>Create an Account</h2>
        <form>
            <label htmlFor="file">
                <img src="/images/AddPhotoAlternateNoFill.svg" alt="" />
                Upload an Image
            </label>
            <input type="file" id="file" style={{display: "none"}}/>
            <input type="text" placeholder="Username" name="username" />
            <input type="text" placeholder="Email" name="email" />
            <input type="password" placeholder="Password" name="password" />
            <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
