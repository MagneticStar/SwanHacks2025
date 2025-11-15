import { useState, useContext } from "react";
import { UserContext } from "../UserContext";

export default function UserSignup() {
  const { setUser } = useContext(UserContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    // Check matching passwords
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send signup request
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (!res.ok) {
        throw new Error("Signup failed");
      }

      const data = await res.json();

      // Example expected server response:
      // {
      //   id: "123",
      //   name: "Lucas",
      //   email: "lucas@example.com",
      //   elo: "1200"
      // }

      // Save user globally
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        elo: data.elo,
      });

      console.log("Signup success 🤰");

    } catch (err) {
      setError("Could not create account.");
      console.error(err);
    }
  }

  return (
    <div style={{ maxWidth: "350px", margin: "auto" }}>
      <h1>Create Account</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
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

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit">Create Account</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
