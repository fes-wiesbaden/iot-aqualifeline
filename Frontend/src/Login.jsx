import { Routes, Route, useNavigate } from "react-router-dom";
import "./css/Login.css";
import "primeicons/primeicons.css";
import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import LoadingScreen from "./LoadingScreen";

function Login() {
  const navigate = useNavigate();
  const toast =
    useRef(
      null,
    ); /** does NOT rerender, makes Toast component method directly callable */
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); /** regex for email */
  };

  const clearInputs = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmPassword("");
  };

  async function login(username, password) {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: username, password: password }),
    });
    const result = await response.json();
    if (response.ok) {
      localStorage.setItem("token", result.token);
    }
    return { success: response.ok, message: result, token: result.token };
  }

  async function register(username, password) {
    console.log("Registering with:", username, password);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name: username, password: password }),
      },
    );
    const result = await response.text();
    return { success: response.ok, message: result };
  }

  const handleSubmit = async () => {
    if (isRegistering) {
      if (!validateEmail(email)) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Invalid email address",
          life: 3000,
        });
        return;
      }
      if (password !== confirmPassword) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Passwords do not match",
          life: 4000,
        });
        return;
      }
      const result = await register(
        username,
        password,
      ); /** declare promise to wait for response */
      if (result.success) {
        localStorage.setItem("token", result.token);
        clearInputs();
        toast.current?.show({
          severity: "success",
          summary: "Account created!",
          detail: "You can now sign in.",
          life: 4000,
        });
        setIsRegistering(false);
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: result.message,
          life: 4000,
        });
      }
    } else {
      const result = await login(
        username,
        password,
      ); /** declare promise to wait for response */
      if (result.success) {
        localStorage.setItem("token", result.token);
        clearInputs();
        navigate("/loggedIn");
      } else {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: result.message,
          life: 4000,
        });
      }
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <div className="login">
      <Toast ref={toast} position="top-right" />
      <h1 id="login-title">{isRegistering ? "CREATE ACCOUNT" : "SIGN IN"}</h1>
      <div className={`input-group`}>
        <h2 className="input-title">Username:</h2>
        <input
          className="default-input"
          placeholder="USERNAME"
          value={username}
          autoComplete="off"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className={`input-group ${!isRegistering ? "hidden" : ""}`}>
        <h2 className="input-title">E-Mail:</h2>
        <input
          className="default-input"
          placeholder="EMAIL"
          value={email}
          autoComplete="off"
          tabIndex={
            !isRegistering ? -1 : 0
          } /** removes it from tab cycle when hidden */
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={`input-group`}>
        <h2 className="input-title">Password:</h2>
        <input
          className="default-input"
          placeholder="PASSWORD"
          autoComplete="new-password"
          type={isRegistering ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={`input-group ${!isRegistering ? "hidden" : ""}`}>
        <h2 className="input-title">Confirm Password:</h2>
        <input
          className="default-input"
          placeholder="CONFIRM PASSWORD"
          autoComplete="new-password"
          tabIndex={
            !isRegistering ? -1 : 0
          } /** removes it from tab cycle when hidden */
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </div>
      <button className="submit" onClick={handleSubmit}>
        {isRegistering ? "REGISTER" : "LOGIN"}
      </button>
      <span
        className="login-toggle"
        onClick={() => {
          setIsRegistering((prev) => !prev);
          clearInputs();
        }}
      >
        {isRegistering
          ? "Already have an account?"
          : "No account yet? Create one!"}
      </span>
    </div>
  );
}

export default Login;
