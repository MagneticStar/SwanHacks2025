import { useState } from "react";

export default function UserSignup({ user, setUser }) {
  const [answers, setAnswers] = useState({
    name: "",
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

    if (answers.password !== answers.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Simulate server response
    const serverResponse = {
      id: crypto.randomUUID(),
      name: answers.name,
      email: answers.email,
      elo: "1200"  // server-calculated
    };

    setUser(serverResponse);
    setError("");
  }

  return (
    <div className="questionnaire">

      <h1 style={{ marginBottom: "1rem" }}>Create Your Account</h1>

      <form onSubmit={handleSubmit}>

        <label>
          What is your full name?
          <input 
            type="text"
            name="name"
            value={answers.name}
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

        <button type="submit" onClick={console.log(answers)}>Create Account</button>

      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}