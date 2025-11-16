import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const res = await fetch("http://localhost:8080/api/users/leaderboard", {
          headers: { "Content-Type": "application/json" }
        });

        if (!res.ok) {
          throw new Error("Failed to load leaderboard");
        }

        const data = await res.json();
        setUsers(data); // backend returns list of users sorted by elo
      } catch (err) {
        console.error(err);
        setError("Could not load leaderboard.");
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 bg-[#313647]">
      <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#313647] text-center mb-6">
          Leaderboard
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="flex flex-col gap-3">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="flex justify-between items-center bg-[#A3B087] text-[#313647] rounded p-3"
            >
              {/* Rank number */}
              <span className="font-bold w-8 text-center">{index + 1}</span>

              {/* Username */}
              <span className="flex-1 text-left">{user.username}</span>

              {/* Elo rating */}
              <span className="font-bold">{user.elo}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Link to="/">
            <button className="bg-[#313647] text-[#FFF8D4] font-bold py-2 px-4 rounded hover:bg-[#222939] transition">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
