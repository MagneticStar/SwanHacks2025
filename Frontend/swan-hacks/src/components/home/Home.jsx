import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
    {
        id: 1,
<<<<<<< HEAD
        title: "Cars",
        description: "Intersections, and vehicles",
        image: "/assets/car1",
=======
        title: "Art",
        description: "Learn the basics of React.",
        image: "/imgs/artpreview.jpg",
>>>>>>> eb83c6e7082ae11c373746f7a18b096df42b4c2f
    },
    {
        id: 2,
        title: "Buildings",
        description: "Introduction to Spring Boot and REST APIs.",
        image: "/imgs/buildingspreview.jpg",
    },
    {
        id: 3,
        title: "Cars",
        description: "Learn the basics of React.",
        image: "/imgs/carpreview.jpg",
    },
    {
        id: 4,
        title: "Landscapes",
        description: "Introduction to Spring Boot and REST APIs.",
        image: "/imgs/landscapespreview.jpg",
    }
];


<<<<<<< HEAD
const Home = ({userInfo}) => {

  console.log(userInfo);

=======
const Home = ({userInfo, setCourse}) => {
>>>>>>> eb83c6e7082ae11c373746f7a18b096df42b4c2f
    return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#A3B087] border-b-2 border-[#FFF8D4] z-50">
        <div className="max-w-[1200px] mx-auto px-5 py-3 flex items-center justify-between">
          <div>dropdown</div>
            <div className="text-3xl font-bold text-[#313647]">AI Spotter</div>
                <div>
                {userInfo && userInfo.name !== '' ? (
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
            <div
            key={course.id}
            className="h-[320px] rounded-lg shadow-lg overflow-hidden relative block bg-[#FFF8D4] hover:shadow-2xl transition"
            >
            <div
                className="absolute inset-0 bg-cover bg-center opacity-80"
                style={{ backgroundImage: `url(${course.image})` }}
            />
            <div className="absolute bottom-0 w-full bg-white/70 backdrop-blur-sm p-4 rounded-b-lg">
              <div className="flex justify-between items-center">
                <p className="font-bold text-lg text-textPrimary truncate">
                  {course.title}
                </p>

                <Link
                  to="/courses"
                  onClick={() => {
                    setCourse(prev => ({
                      ...prev,
                      id: course.id
                    }))
                  }}
                  className="p-2 rounded-xl shadow-sm"
                >
                  <img
                    src="/imgs/play-icon.png"
                    alt="Play"
                    className="w-6 h-6"
                  />
                </Link>
              </div>
            </div>
            </div>
        ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
