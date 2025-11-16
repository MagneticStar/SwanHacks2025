import { useState } from "react";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="card max-w-md w-full">
        <h1 className="font-heading text-2xl mb-6 text-textPrimary text-center">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" className="btn-primary mt-2">
            Login
          </button>
        </form>

        {error && <p className="text-warning mt-3 text-center">{error}</p>}

        <div className="mt-4 text-center">
          <Link to="/signup">
            <button className="btn-secondary">Create Account</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
