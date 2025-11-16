import { useState } from "react";

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

      // Expected response example:
      // { id: 1, username: "...", email: "...", elo: 1200 }

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
    <div className="questionnaire">

      <h1 style={{ marginBottom: "1rem" }}>Create Your Account</h1>

      <form onSubmit={handleSubmit}>

        <label>
          Choose a username:
          <input
            type="text"
            name="username"
            value={answers.username}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          What email do you want to use?
          <input
            type="email"
            name="email"
            value={answers.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Choose a password:
          <input
            type="password"
            name="password"
            value={answers.password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Re-enter your password:
          <input
            type="password"
            name="confirmPassword"
            value={answers.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Create Account</button>

      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
