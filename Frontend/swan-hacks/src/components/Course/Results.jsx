import { useNavigate } from "react-router-dom";

export default function Results({ course, setCourse }) {
  const navigate = useNavigate();

  // Redirect if no results are present
  if (!course || !course.percentScore) {
    return (
      <div className="p-6 text-center">
        <p>No course results found.</p>
        <button
          onClick={() => navigate("/courses")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go to Courses
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1>Results for {course.name}</h1>

      <div style={{ marginTop: "2rem" }}>
        <p style={{ fontSize: "1.2rem" }}>
          <strong>Score: </strong> {course.percentScore}
        </p>

        <p style={{ fontSize: "1.2rem" }}>
          <strong>Time Taken: </strong> {course.timeTaken}
        </p>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <button
          onClick={() => navigate("/courses")}
          style={{
            marginRight: "1rem",
            padding: "0.7rem 1.4rem",
            background: "#3498db",
            color: "white",
            borderRadius: "8px",
            border: "none"
          }}
        >
          Home
        </button>

        <button
          onClick={() => {
            // Clear results so user can retry
            setCourse(prev => ({
              ...prev,
              timeTaken: null,
              percentScore: null
            }));

            navigate("/courses");
          }}
          style={{
            padding: "0.7rem 1.4rem",
            background: "#2ecc71",
            color: "white",
            borderRadius: "8px",
            border: "none"
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}