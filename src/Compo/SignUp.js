import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    create_pwd: "",
    confirm_pwd: "",
  });

  const [displayMsg, setDisplayMsg] = useState({
    isError: false,
    message: "",
    display: "not-show",
    msgState: "",
  });

  useEffect(() => {
    document.title = "Sign Up - Coco";
  });

  function createAccountButton(ev) {
    ev.preventDefault();

    // CHECK FOR EMPTY INPUT
    if (user.username && user.email && user.create_pwd && user.confirm_pwd) {
      if (user.create_pwd === user.confirm_pwd) {
        // SEND DATA TO SEVER
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState === 4 && this.status === 200) {
            const { isCondition, message: msg } = JSON.parse(this.response);
            if (isCondition) {
              setDisplayMsg({
                message: msg,
                display: "show",
                msgState: "success",
              });
            } else {
              setDisplayMsg({
                message: msg,
                display: "show",
                msgState: "error",
              });
            }
          }
        };

        xhttp.open("POST", "http://localhost:5000/create_account", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(JSON.stringify(user));
        setUser({ username: "", email: "", create_pwd: "", confirm_pwd: "" });
      } else {
        setDisplayMsg({
          message: "Password Mismatch!",
          display: "show",
          msgState: "error",
        });
      }
    } else {
      setDisplayMsg({
        message: "Fill in the blank field!",
        display: "show",
        msgState: "error",
      });
    }
  }

  function inputText(ev) {
    let eleName = ev.target.name,
      eleValue = ev.target.value;

    setUser({ ...user, [eleName]: eleValue.trim() });
  }
  return (
    <div className="container" id="sign-up-wrapper">
      <header className="page-header">
        <h1>Sign Up</h1>
        <p>Register Today! Chat Today!</p>
      </header>

      <div className={`message ${displayMsg.msgState} ${displayMsg.display}`}>
        {/* <i className=""></i> */}
        <p>
          <strong>{displayMsg.message}</strong>
        </p>
      </div>

      <form method="POST">
        <div className="input-ctn">
          <i className="bi bi-person-fill"></i>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Create Username"
            value={user.username}
            onChange={inputText}
          />
        </div>
        <div className="input-ctn">
          <i className="bi bi-envelope-fill"></i>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            value={user.email}
            onChange={inputText}
          />
        </div>
        <div className="input-ctn">
          <i className="bi bi-lock-fill"></i>
          <input
            type="password"
            name="create_pwd"
            id="pwd"
            placeholder="Password"
            value={user.create_pwd}
            onChange={inputText}
          />
        </div>
        <div className="input-ctn">
          <i className="bi bi-lock-fill"></i>
          <input
            type="password"
            name="confirm_pwd"
            id="c-pwd"
            placeholder="Confirm Password"
            value={user.confirm_pwd}
            onChange={inputText}
          />
        </div>
        <div id="btn-ctn">
          <input
            type="button"
            className="btn"
            value="Sign Up"
            onClick={createAccountButton}
          />
        </div>

        <div
          style={{ width: "100%", padding: "10px 0 10px", textAlign: "center" }}
        >
          <p>
            Haven't create account.{" "}
            <Link
              to="/user"
              style={{
                textDecoration: "none",
                color: "#ff3255",
              }}
            >
              Log In
            </Link>
          </p>
        </div>
      </form>
      <footer>&copy; 2022</footer>
    </div>
  );
}

export default SignUp;
