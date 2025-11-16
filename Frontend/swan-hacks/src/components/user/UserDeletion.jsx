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
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10">
      <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#313647] mb-3">Delete Account</h1>
        <p className="text-[#313647] mb-6">
          Enter your username and password to confirm account deletion.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleDelete}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-2 rounded border border-gray-300"
            required
          />

          <div className="flex justify-between gap-4 mt-2">
            {/* Delete button - warning color */}
            <button
              type="submit"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition"
            >
              Delete Account
            </button>
            
            {/* Back button - navigates without submitting */}
            <button
              type="button"
              onClick={() => navigate("/user-info")}
              className="bg-[#A3B087] text-[#313647] font-bold py-2 px-4 rounded hover:bg-[#8c9a6d] transition"
            >
              Back
            </button>
          </div>
        </form>

        {error && <p className="text-red-600 mt-4">{error}</p>}
        {success && <p className="text-green-600 mt-4">{success}</p>}
      </div>
    </div>
  );
}
