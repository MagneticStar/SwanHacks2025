import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteUser({ userInfo, setUserInfo }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if user not logged in
  useEffect(() => {
    if (!userInfo || !userInfo.id || userInfo.user === "") {
      navigate("/");
    }
  }, [userInfo, navigate]);

  if (userInfo.name === '') {
    navigate('/login');
  }

  // Update form state when inputs change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Handle account deletion
  async function handleDelete(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check if entered username matches logged-in user
    if (form.username !== userInfo.user) {
      console.log(form);
      console.log(userInfo);
      setError(
        "Username does not match logged-in user: " + userInfo.user
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          password: form.password,
        }),
      });

      if (!res.ok) throw new Error("Delete failed");

      // Clear form and user info
      setForm({ username: "", password: "" });
      setUserInfo({
        id: "",
        name: "",
        user: "",
        email: "",
        elo: "",
      });

      setSuccess("Account deleted successfully");

      // Navigate to signup after a short delay
      setTimeout(() => navigate("/signup"), 1500);
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10">
      <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#313647] mb-3">
          Delete Account
        </h1>
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

          <div className="flex w-full gap-4 mt-2">
            {/* Delete button */}
            <button
              type="submit"
              className="flex-1 bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition"
            >
              Delete Account
            </button>

            {/* Back button */}
            <button
              type="button"
              onClick={() => navigate("/user-info")}
              className="flex-1 bg-[#A3B087] text-[#313647] font-bold py-2 rounded hover:bg-[#8c9a6d] transition"
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
