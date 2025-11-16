import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Course({ userInfo, course, setCourse }) {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);  // Stores 6 images from server
  const [index, setIndex] = useState(0);     // Which image user is on
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // Redirect if user not logged in
  useEffect(() => {
    if (!userInfo || !userInfo.id) {
      alert("⚠️ You must be logged in to take this course.");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // Load 6 images when course starts
  useEffect(() => {
    async function loadImages() {
      try {
        const res = await fetch("http://localhost:8080/api/course/images");
        const data = await res.json();

        // Server must return: [{ id, url, isAI }, ...]
        setImages(data.slice(0, 6));
        setStartTime(Date.now());
      } catch (err) {
        console.error(err);
        alert("Failed to load course images 🤰");
      }
    }

    loadImages();
  }, []);

  // User clicks "AI" or "Not AI"
  async function submitGuess(responseValue) {
    const current = images[index];

    try {
      await fetch("http://localhost:8080/api/course/submit-guess", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userInfo.id,
          imageId: current.id,
          response: responseValue,      // 1 or 0
          imageIsAI: current.isAI ? 1 : 0
        })
      });
    } catch (err) {
      console.error(err);
    }

    // Check correctness
    const correct = (current.isAI ? 1 : 0) === responseValue;
    if (correct) {
      setScore(score + 1);
    }

    // Move to next image
    if (index + 1 < images.length) {
      setIndex(index + 1);
    } else {
      finishCourse();
    }
  }

  // Called after last image
  function finishCourse() {
    const endTime = Date.now();
    const seconds = Math.round((endTime - startTime) / 1000);

    const percent = Math.round((score / images.length) * 100);

    // Save into course object
    setCourse({
      ...course,
      timeTaken: `${seconds}s`,
      percentScore: `${percent}%`
    });

    // Go to results page
    navigate("/results");
  }

  if (images.length === 0) {
    return <p>Loading course images…</p>;
  }

  const current = images[index];

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1>{course.name}</h1>

      <p>Image {index + 1} / {images.length}</p>

      <img
        src={current.url}
        alt="Course"
        style={{ width: "100%", borderRadius: "8px", marginBottom: "1rem" }}
      />

      <div>
        <button
          onClick={() => submitGuess(1)}
          style={{ marginRight: "1rem" }}
        >
          AI
        </button>

        <button onClick={() => submitGuess(0)}>
          Not AI
        </button>
      </div>
    </div>
  );
}
