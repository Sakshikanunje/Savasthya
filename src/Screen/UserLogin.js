import React, { useState } from "react";
import Axios from "axios";
import "./UserLogin.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  const [showLoginForm, setShowLoginForm] = useState(true);

  const UserRegister = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/userRegister", {
      email: email,
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setRegisterStatus(response.data.message);
      } else {
        setRegisterStatus("ACCOUNT CREATED SUCCESSFULLY");
      }
    });
  };

  const UserLogin = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3001/UserLogin", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].email);
        Axios.post("http://localhost:3001/generateQR", {
          username: username,
          email: response.data[0].email,
        }).then((qrResponse) => {
          console.log(qrResponse.data.pdfPath);
          window.open(qrResponse.data.pdfPath, "_blank");
        });
      }
    });
  };

  const toggleForm = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setShowLoginForm((prevState) => !prevState);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="loginForm" style={{ opacity: showLoginForm ? 1 : 0, zIndex: showLoginForm ? 1 : 0 }}>
          <form>
            <h4>Login Here</h4>
            <label htmlFor="username">Username*</label>
            <input
              className="textInput"
              type="text"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter your Username"
              required
            />
            <label htmlFor="password">Password*</label>
            <input
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your Password"
              required
            />
            <input
              className="button"
              type="submit"
              onClick={UserLogin}
              value="Login"
            />
            <h1
              style={{
                color: "red",
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {loginStatus}
            </h1>
            <button className="toggle-button" onClick={toggleForm}>
              Signup
            </button>
          </form>
        </div>
        <div className="loginForm" style={{ opacity: showLoginForm ? 0 : 1, zIndex: showLoginForm ? 0 : 1 }}>
          <form>
            <h4>Register Here</h4>
            <label htmlFor="email">Email Address*</label>
            <input
              className="textInput"
              type="text"
              name="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter your Email Address"
              required
            />
            <label htmlFor="username">Username*</label>
            <input
              className="textInput"
              type="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter your Username"
              required
            />
            <label htmlFor="password">Password*</label>
            <input
              className="textInput"
              type="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter your Password"
              required
            />
            <input
              className="button"
              type="submit"
              onClick={UserRegister}
              value="Create an account"
            />
            <h1
              style={{
                fontSize: "15px",
                textAlign: "center",
                marginTop: "20px",
              }}
            >
              {registerStatus}
            </h1>
            <button className="toggle-button" onClick={toggleForm}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}