import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// we need to grab 6 random images from the backend
// we need to know (course, description) from frontend

// display stuff

// grab user input
// send to backend the users choice

// get answer from backend (Right or wrong / New ELO)
// user clicks button

// loop back to display stuff (until images run out)

// display ending screen (elo gained lost / Correct incorrect)
// Collect user input (home / again)



export default function Course({ userInfo, course, setCourse }) {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);  // Stores 6 images from server
  const [index, setIndex] = useState(0);     // Which image user is on
  const [score, setScore] = useState(0);

  // Redirect if user not logged in
  useEffect(() => {
    if (!userInfo || !userInfo.id) {
      alert("You must be logged in to take this course.");
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // Load 6 images when course starts
  useEffect(() => {
    async function loadImages() {
      try {
        console.log(course.id);
        const res = await fetch(`http://localhost:8080/api/images/course/${course.id}`);
        const data = await res.json();
        // Server must return: [{ id, url, isAI }, ...]
        // pick random 6 imgs
        const indices = new Set();
        while (indices.size < 6 && indices.size < data.length) {
          indices.add(Math.floor(Math.random() * data.length));
        }
        const imgs = [...indices].map(i => ({
          path: data[i].path,
          id: data[i].id
        }));
        console.log(imgs);
        setImages(imgs);
      } catch (err) {
        console.error(err);
        alert("Failed to load course images");
      }
    }

    loadImages();
  }, []);

  // User clicks "AI" or "Not AI"
  async function submitGuess(responseValue) {
    const current = images[index];

    try {
      const response = await fetch("http://localhost:8080/api/images/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // <-- send token
        },
        body: JSON.stringify({
          imageId: current.id,
          guessedAI: responseValue,   
        })
      });
      if (!response.ok) {
        throw new Error(await response.text()); 
      }

      const result = await response.json();

      if (result.correctGuess) {
        setScore(score + result.userElo);
      }

    } catch (err) {
      console.error(err);
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

    // Save into course object


    // Go to results page
    navigate("/results");
  }

  if (images.length === 0) {
    return <p>Loading course images…</p>;
  }

  const current = images[index];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10 bg-[#313647]">
  <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
    {/* Title */}
    <h1 className="text-2xl font-bold text-[#313647] text-center mb-6">
      {course.name}
    </h1>

    {/* Progress indicator */}
    <p className="text-[#313647] text-center mb-4">
      Image {index + 1} / {images.length}
    </p>

    {/* Large central image */}
    <img
      src={current.path}
      alt="Course"
      className="w-full max-h-[400px] object-cover rounded-lg mb-6"
    />

    {/* Buttons at the bottom */}
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => submitGuess(1)}
        className="flex-1 bg-[#4CAF50] text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition"
      >
        AI
      </button>

      <button
        onClick={() => submitGuess(0)}
        className="flex-1 bg-[#f44336] text-white font-bold py-2 px-4 rounded hover:bg-red-700 transition"
      >
        Not AI
      </button>
    </div>
  </div>
</div>
  );
}
