import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
    {
        id: 1,
        title: "React for Beginners",
        description: "Learn the basics of React.",
        image: "/imgs/react.svg",
    },
    {
        id: 2,
        title: "Spring Boot Fundamentals",
        description: "Introduction to Spring Boot and REST APIs.",
        image: "/imgs/vite.svg",
    },
    {
        id: 3,
        title: "React for Beginners",
        description: "Learn the basics of React.",
        image: "/imgs/react.svg",
    },
    {
        id: 4,
        title: "Spring Boot Fundamentals",
        description: "Introduction to Spring Boot and REST APIs.",
        image: "/imgs/vite.svg",
    }
];

const Home = (userInfo) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#A3B087] border-b-2 border-[#FFF8D4] z-50">
        <div className="max-w-[1200px] mx-auto px-5 py-3 flex items-center justify-between">
          <div>dropdown</div>
            <div className="text-3xl font-bold text-[#313647]">AI Spotter</div>
                <div>
                {userInfo?.name != '' ? (
                    <Link to="/user-info">
                    <p className="hover:underline cursor-pointer text-[#313647]">View Profile</p>
                    </Link>
                ) : (
                    <Link to="/login">
                    <p className="hover:underline cursor-pointer text-[#313647]">Login</p>
                    </Link>
                )}
                </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto mt-[68px] px-5 py-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-3/4 mx-auto">
        {courses.map(course => (
            <Link
            key={course.id}
            to={`/courses/${course.id}`}
            className="h-[320px] rounded-lg shadow-lg overflow-hidden relative cursor-pointer block bg-[#FFF8D4] hover:shadow-2xl transition"
            >
            <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${course.image})` }}
            />
            <div className="absolute bottom-0 w-full bg-white/70 backdrop-blur-sm p-4 rounded-b-lg">
                <p className="font-bold text-lg text-[#313647] truncate">{course.title}</p>
                <p className="text-sm text-[#A3B087] mt-1 line-clamp-2">{course.description}</p>
            </div>
            </Link>
        ))}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-[#A3B087] border-t-2 border-[#FFF8D4] z-50">
        <div className="px-5 py-2.5 flex items-center justify-between">
          {/* empty content */}
        </div>
      </div>
    </div>
  );
};

export default Home;
