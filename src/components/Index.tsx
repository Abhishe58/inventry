import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Index.css";

export default function Index() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [respo, setRespo] = useState("");
  const navia = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("https://inventryser.onrender.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      setRespo(data.message);
      if (res.ok) {
        localStorage.setItem("name", data.name);
        localStorage.setItem("userId", data.userId);
        navia("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="loginWorld">
        <div className="logincontainera">
          <h1>
            Inventry <span style={{ color: "royalblue" }}>Management</span>
          </h1>
          <h1>Welcome Back</h1>
          <h2>Manage Your Stock with Ease</h2>
          <p>
            Access your secure dashboard to monitor real-time inventory levels,
            update product stocks, and track daily sales performance. Sign in
            now to keep your business operations running smoothly and
            efficiently today.
          </p>
        </div>
        <div className="logincontainerb">
          <form className="loginForm" onSubmit={submitLogin}>
            <h1>login</h1>
            <div className="loginformBox">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={loginForm.email}
                placeholder="Email"
                className="loginformInput"
                required
              />
            </div>
            <div className="loginformBox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={loginForm.password}
                placeholder="Password"
                className="loginformInput"
                required
              />
            </div>
            <button type="submit" className="loginBut">
              Login
            </button>
          </form>
          <p>
            Create a account?{" "}
            <Link to="/signup" className="signupLink">
              Signup
            </Link>
          </p>
          <p>{respo}</p>
        </div>
      </div>
    </>
  );
}
