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
  }
];

const Home = ({ }) => {

    return (
        <div className="flex flex-col h-screen">
            <div className="fixed top-0 left-0 w-full bg-[#6B4226] border-b-2 border-gray-800 text-white z-50">
                <div className="px-5 py-2.5 flex items-center justify-between">
                    <div>
                        <p>dropdown</p>
                    </div>
                    <div>
                        <p>symbol</p>
                    </div>
                    <div>
                        <Link to="/login">
                            <p>user/login</p>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex-1 mt-[60px] mb-[60px] overflow-y-auto px-5 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map(course => (
                        <Link
                            key={course.id}
                            to={`/courses/${course.id}`}
                            className="h-[320px] rounded-lg shadow-md overflow-hidden relative cursor-pointer"
                        >
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{ backgroundImage: `url(${course.image})` }}
                            />

                            <div className="absolute bottom-0 w-full bg-white/70 backdrop-blur-sm p-4">
                                <p className="font-bold text-lg text-gray-800 truncate m-0">{course.title}</p>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-[#6B4226] border-t-2 border-gray-800 text-white z-50">
                <div className="px-5 py-2.5 flex items-center justify-between">
                    <p>endless mode</p>
                    {/* empty content */}
                </div>
            </div>
        </div>
    );
};

export default Home;