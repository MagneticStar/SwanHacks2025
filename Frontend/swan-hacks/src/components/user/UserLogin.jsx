import { useState } from "react";
import { Link } from "react-router-dom"; // only if using React Router

export default function UserLogin({ setUserInfo }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Invalid login");
      }

      const data = await res.json();

      setUserInfo({
        id: data.id,
        name: data.name,
        username: data.username,
        elo: data.elo,
      });
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  }

  return (
    <div style={{ maxWidth: "350px", margin: "auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Create Account Button */}
      <div style={{ marginTop: "10px" }}>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
  );
}
