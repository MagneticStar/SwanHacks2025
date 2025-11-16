import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function DeleteUser({ userInfo, setUserInfo }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if user is not logged in or name is empty
  useEffect(() => {
    if (!userInfo || !userInfo.id || userInfo.name === "") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.username !== userInfo.username) {
      setError("Username does not match logged-in user.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/delete-user", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });

      if (!res.ok) {
        throw new Error("Failed to delete account");
      }

      setSuccess("Account deleted successfully 🤰");
      setUserInfo({ id: "", name: "", username: "", elo: "" });
      setTimeout(() => navigate("/signup"), 1500);

    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h1>Delete Account</h1>
      <p style={{ marginBottom: "1rem" }}>
        Enter your username and password to confirm account deletion.
      </p>

      <form onSubmit={handleDelete}>
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
        <button type="submit" style={{ marginTop: "0.5rem" }}>Delete Account</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Back button to /user-info */}
      <div style={{ marginTop: "1rem" }}>
        <Link to="/user-info">
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
}
