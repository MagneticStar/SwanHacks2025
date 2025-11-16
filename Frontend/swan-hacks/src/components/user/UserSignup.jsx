import { useState } from "react";
import { Link } from "react-router-dom";

// Path: http://localhost:8080/api/users  (POST)
// Keys: username, password, email
// returns: id => user.id

export default function UserSignup({ user, setUser }) {
  const [answers, setAnswers] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (answers.password !== answers.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: answers.username,
          password: answers.password,
          email: answers.email
        })
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const data = await response.json();

      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        elo: data.elo
      });

    } catch (err) {
      console.error(err);
      setError("Unable to create account. Try again.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 bg-[#313647]">
      <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#313647] text-center mb-6">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            placeholder="Choose a username"
            value={answers.username}
            onChange={handleChange}
            required
            className="p-3 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B087]"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={answers.email}
            onChange={handleChange}
            required
            className="p-3 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B087]"
          />

          <input
            type="password"
            name="password"
            placeholder="Choose a password"
            value={answers.password}
            onChange={handleChange}
            required
            className="p-3 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B087]"
          />

          {/* Confirm Password with floating tooltip */}
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={answers.confirmPassword}
              onChange={handleChange}
              required
              className="p-3 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B087]"
            />

            {answers.confirmPassword &&
              answers.password !== answers.confirmPassword && (
                <div className="absolute -top-6 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md">
                  Passwords do not match
                </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#A3B087] text-[#313647] font-bold py-2 rounded hover:bg-[#8c9a6d] transition mt-2"
          >
            Create Account
          </button>
        </form>

        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}

        <div className="mt-4 text-center">
          <Link to="/login">
            <button className="w-full bg-[#313647] text-[#FFF8D4] font-bold py-2 rounded hover:bg-[#222939] transition">
              Back to Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
