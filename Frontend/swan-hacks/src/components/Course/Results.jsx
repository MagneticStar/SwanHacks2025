import { Link } from "react-router-dom";

export default function Results({ results }) {
  if (!results || !results.correct || results.correct.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 bg-[#313647]">
        <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6 text-center">
          <p className="text-[#313647] mb-4">No course results found.</p>
          <Link to="/courses">
            <button className="bg-[#313647] text-[#FFF8D4] font-bold py-2 px-4 rounded hover:bg-[#222939] transition">
              Go to Courses
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 bg-[#313647]">
      <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#313647] text-center mb-6">
          Results
        </h1>

        {/* Elo change */}
        <div className="flex justify-between items-center bg-[#A3B087] text-[#313647] rounded p-3 mb-4">
          <span className="flex-1 text-left font-bold">ELO Change</span>
          <span className="font-bold">{results.elodiff}</span>
        </div>

        {/* Correctness list */}
        <div className="flex flex-col gap-3">
          {results.correct.map((val, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center bg-[#A3B087] text-[#313647] rounded p-3"
            >
              <span className="font-bold w-8 text-center">{idx + 1}</span>
              <span className="flex-1 text-left">Image {idx + 1}</span>
              <span className="font-bold">{val || "No Answer"}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-6 gap-4">
          <Link to="/courses">
            <button className="bg-[#313647] text-[#FFF8D4] font-bold py-2 px-4 rounded hover:bg-[#222939] transition">
              Try Again
            </button>
          </Link>

          <Link to="/">
            <button className="bg-[#2ecc71] text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
