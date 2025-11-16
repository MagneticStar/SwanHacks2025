import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Course({ userInfo, course, setResults }) {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);   // Stores 6 images from server
  const [index, setIndex] = useState(0);      // Which image user is on
  const [eloChange, setEloChange] = useState(0); // Accumulated elo change
  const [correctArray, setCorrectArray] = useState(["","","","","",""]); // Track correctness
  const [showDescription, setShowDescription] = useState(true);

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
        const res = await fetch(`http://localhost:8080/api/images/course/${course.id}`);
        const data = await res.json();
        // pick random 6 imgs
        const indices = new Set();
        while (indices.size < 6 && indices.size < data.length) {
          indices.add(Math.floor(Math.random() * data.length));
        }
        const imgs = [...indices].map(i => ({
          path: data[i].path,
          id: data[i].id
        }));
        setImages(imgs);
      } catch (err) {
        console.error(err);
        alert("Failed to load course images");
      }
    }

    loadImages();
  }, [course.id]);

  // User clicks "AI" or "Not AI"
  async function submitGuess(responseValue) {
    const current = images[index];

    try {
      const response = await fetch("http://localhost:8080/api/images/guess", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
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

      // Update elo change
      const delta = result.userElo - userInfo.elo;
      console.log(result.userElo);
      console.log(userInfo.userElo);
      console.log(delta);
      console.log(eloChange + delta);
      setEloChange(eloChange => eloChange + delta);

      // Update correctness array
      setCorrectArray(prev =>
        prev.map((val, idx) =>
          idx === index ? (result.correctGuess ? "Correct" : "Incorrect") : val
        )
      );

    } catch (err) {
      console.error(err);
    }

    // Move to next image or finish
    if (index + 1 < images.length) {
      setIndex(index + 1);
    } else {
      finishCourse();
    }
  }

  // Called after last image
  function finishCourse() {
    // Save into results object
    setResults({
      elodiff: eloChange,
      correct: correctArray,
    });

    // Go to results page
    navigate("/results");
  }

  if (showDescription) {
      console.log(course.name);
      console.log(course.description);
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#313647] px-5 py-10">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">

            <h1 className="text-2xl font-bold text-center mb-4">{course.name}</h1>

            <p className="text-gray-700 mb-6 text-center">
              {course.description}
            </p>

            <button
              onClick={() => setShowDescription(false)}
              className="w-full bg-[#313647] text-white py-2 rounded hover:bg-black transition"
            >
              Start Course
            </button>
          </div>
        </div>
      );
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
