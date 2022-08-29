import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function LogIn({ setToken, setUserId }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [displayMsg, setDisplayMsg] = useState({
    isError: false,
    message: "",
    display: "not-show",
    msgState: "",
  });

  useEffect(() => {
    document.title = "Login - Coco";
  });

  function loginHandler(ev) {
    ev.preventDefault();

    if (user.username !== "" && user.password) {
      const xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
          const { isCondition, message: msg } = JSON.parse(this.response);
          if (!isCondition) {
            setDisplayMsg({ msgState: "error", message: msg, display: "show" });
          } else {
            let { id, token } = JSON.parse(this.response);
            console.log(id, token, setToken);
            setToken(token);
            setUserId(id);
          }
        }
      };
      xhttp.open("POST", "http://localhost:5000/login", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(user));
    } else {
      setDisplayMsg({
        message: "Fill in the empty field!",
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
        <h1>Log In</h1>
        <p>Welcome Guest User!</p>
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
            placeholder="Username or Email Address"
            value={user.username}
            onChange={inputText}
          />
        </div>

        <div className="input-ctn">
          <i className="bi bi-lock-fill"></i>
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={user.password}
            onChange={inputText}
          />
        </div>

        <div id="btn-ctn">
          <input
            type="button"
            className="btn"
            value="Log In"
            onClick={loginHandler}
          />
        </div>

        <div
          style={{ width: "100%", padding: "10px 0 10px", textAlign: "center" }}
        >
          <p>
            Haven't create account.{" "}
            <Link
              to="/signup"
              style={{
                textDecoration: "none",
                color: "#ff3255",
              }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </form>
      <footer>&copy; 2022</footer>
    </div>
  );
}

LogIn.propTypes = {
  setToken: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired,
};
