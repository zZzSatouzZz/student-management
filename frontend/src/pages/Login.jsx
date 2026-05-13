import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaFacebookF,
  FaGithub,
  FaGooglePlusG,
  FaLinkedinIn,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
  loginApi,
  registerApi,
} from "../services/auth.service";

import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  const [isActive, setIsActive] =
    useState(false);
  const [registerName, setRegisterName] =
    useState("");

  const [loginEmail, setLoginEmail] =
    useState("");

  const [loginPassword, setLoginPassword] =
    useState("");
    const [showLoginPassword, setShowLoginPassword] =
  useState(false);

const [
  showRegisterPassword,
  setShowRegisterPassword,
] = useState(false);

  const [registerEmail, setRegisterEmail] =
    useState("");

  const [registerPassword, setRegisterPassword] =
    useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  console.log("LOGIN CLICK");

  try {

    const res = await loginApi({
      email: loginEmail,
      password: loginPassword,
    });

    console.log(res);

    localStorage.setItem(
      "token",
      res.data.data.token
    );

    toast.success("Login success");

    navigate("/students");

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      error.message ||
      "Login failed"
    );
  }

    try {
      const res = await loginApi({
        email: loginEmail,
        password: loginPassword,
      });

      localStorage.setItem(
        "token",
        res.data.data.token
      );

      toast.success("Login success");

      navigate("/students");
    } catch (error) {
      toast.error(
        error.response?.data?.message
      );
    }
  };
 const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const res = await registerApi({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });

    // thông báo
    toast.success("Sign Up Success");

    // reset form
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");

    // chuyển về sign in
    setIsActive(false);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Register failed"
    );
  }


  try {
    const res = await registerApi({
      name: registerName,
      email: registerEmail,
      password: registerPassword,
    });

    toast.success("Register success");

    // chuyển về login
    setIsActive(false);
  }catch (error) {

  console.log(error);

  toast.error(
    error.response?.data?.message ||
    error.message ||
    "Register failed"
  );
}
};

  return (
    <div
      className={
        isActive
          ? "container active"
          : "container"
      }
      id="container"
    >
      <div className="form-container sign-up">
       <form onSubmit={handleRegister}>
          <h1>Create Account</h1>

          <div className="social-icons">
            <a href="#" className="icon">
              <FaGooglePlusG />
            </a>

            <a href="#" className="icon">
              <FaFacebookF />
            </a>

            <a href="#" className="icon">
              <FaGithub />
            </a>

            <a href="#" className="icon">
              <FaLinkedinIn />
            </a>
          </div>

          <span>
            or use your email for
            registeration
          </span>

         <input
  type="text"
  placeholder="Name"
  value={registerName}
  onChange={(e) =>
    setRegisterName(e.target.value)
  }
/>

          <input
            type="email"
            placeholder="Email"
            value={registerEmail}
            onChange={(e) =>
              setRegisterEmail(
                e.target.value
              )
            }
          />

          <div className="password-box">
  <input
    type={
      showRegisterPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={registerPassword}
    onChange={(e) =>
      setRegisterPassword(
        e.target.value
      )
    }
  />

  <span
    className="eye-icon"
    onClick={() =>
      setShowRegisterPassword(
        !showRegisterPassword
      )
    }
  >
    {showRegisterPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}
  </span>
</div>

          <button type="submit">
            Sign Up
          </button>
        </form>
      </div>

      <div className="form-container sign-in">
        <form onSubmit={handleLogin}>
          <h1>Sign In</h1>

          <div className="social-icons">
            <a href="#" className="icon">
              <FaGooglePlusG />
            </a>

            <a href="#" className="icon">
              <FaFacebookF />
            </a>

            <a href="#" className="icon">
              <FaGithub />
            </a>

            <a href="#" className="icon">
              <FaLinkedinIn />
            </a>
          </div>

          <span>
            or use your email password
          </span>

          <input
            type="email"
            placeholder="Email"
            value={loginEmail}
            onChange={(e) =>
              setLoginEmail(
                e.target.value
              )
            }
          />

         <div className="password-box">
  <input
    type={
      showLoginPassword
        ? "text"
        : "password"
    }
    placeholder="Password"
    value={loginPassword}
    onChange={(e) =>
      setLoginPassword(
        e.target.value
      )
    }
  />

  <span
    className="eye-icon"
    onClick={() =>
      setShowLoginPassword(
        !showLoginPassword
      )
    }
  >
    {showLoginPassword ? (
      <FaEyeSlash />
    ) : (
      <FaEye />
    )}
  </span>
</div>

          <a href="#">
            Forget Your Password?
          </a>

          <button type="submit">
            Sign In
          </button>
        </form>
      </div>

      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>

            <p>
              Enter your personal
              details to use all of
              site features
            </p>

            <button
              className="hidden"
              onClick={() =>
                setIsActive(false)
              }
            >
              Sign In
            </button>
          </div>

          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>

            <p>
              Register with your
              personal details to use
              all of site features
            </p>

            <button
              className="hidden"
              onClick={() =>
                setIsActive(true)
              }
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}