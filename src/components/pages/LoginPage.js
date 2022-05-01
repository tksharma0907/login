import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import "../../App.css";
import HomePage from "./HomePage";

export default function SignInPage() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1",
    },
    {
      username: "user2",
      password: "pass2",
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password",
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="text-center m-5-auto">
      <h2>Sign in to us</h2>
      <form onSubmit={handleSubmit} action="/home">
        <p>
          <label>Username or email address</label>
          <br />
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </p>
        <p>
          <label>Password</label>
          <br />
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </p>
        <p>
          <button id="sub_btn" type="submit">
            Login
          </button>
        </p>
      </form>
    </div>
  );

  return <>{isSubmitted ? <Redirect to="/home" /> : renderForm}</>;
}
