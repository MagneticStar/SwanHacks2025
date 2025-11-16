import { useState } from "react";
import { Link } from "react-router-dom";

// http://localhost:8080/api/auth/login POST
// Required to call
// keys: username + password (this is setUserInfo.name and forget about the password)
// returns: all keys + token

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
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 bg-[#313647]">
      <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#313647] text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B087]"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B087]"
          />
          <button
            type="submit"
            className="bg-[#A3B087] text-[#313647] font-bold py-2 px-4 rounded hover:bg-[#8c9a6d] transition mt-2"
          >
            Login
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <div className="flex justify-between gap-4 mt-2">
          <Link to="/">
            <button className="bg-[#313647] text-[#FFF8D4] font-bold py-2 px-4 rounded hover:bg-[#222939] transition">
              Home
            </button>
          </Link>

          <Link to="/signup">
            <button className="bg-[#313647] text-[#FFF8D4] font-bold py-2 px-4 rounded hover:bg-[#222939] transition">
              Create Account
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
