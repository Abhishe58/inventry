import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Index() {
  const [signupForm, setsignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [respo, setRespo] = useState("");
  const navi = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setsignupForm((prev) => ({ ...prev, [name]: value }));
  };

  const submitSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("https://inventryser.onrender.com/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });
      const data = await res.json();
      if (res.ok) {
        navi("/");
      }
      setRespo(data.message);
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
          <h1>Join Inventory</h1>
          <h2>Start Organizing Your Business</h2>
          <p>
            Create your professional account to simplify warehouse management.
            Register now to add unlimited products, track stock movements, and
            gain valuable insights into your sales trends with our easy-to-use
            digital tracking tools.
          </p>
        </div>
        <div className="logincontainerb">
          <form className="loginForm" onSubmit={submitSignup}>
            <h1>Signup</h1>
            <div className="loginformBox">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                value={signupForm.name}
                placeholder="Name"
                className="loginformInput"
                required
              />
            </div>
            <div className="loginformBox">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                value={signupForm.email}
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
                value={signupForm.password}
                placeholder="Password"
                className="loginformInput"
                required
              />
            </div>
            <button type="submit" className="loginBut">
              Signup
            </button>
          </form>
          <p>
            Have a account?{" "}
            <Link to="/" className="signupLink">
              Login
            </Link>
          </p>
          <p>{respo}</p>
        </div>
      </div>
    </>
  );
}
