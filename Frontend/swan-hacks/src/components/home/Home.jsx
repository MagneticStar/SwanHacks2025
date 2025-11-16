import React from 'react';
import { Link } from 'react-router-dom';

const courses = [
  {
    id: 13,
    title: "Art",
    description: `
The Art course teaches students to identify AI-generated artwork, including
digital paintings, comics, and graphic designs. Key giveaways include overly
smooth or perfect gradients, unnatural color palettes, or reflections that don’t
match the scene. Look for inconsistent anatomy in characters, unusual
proportions, or repeated textures in patterns. AI may struggle with complex
backgrounds, perspective, and fine brushstroke details, which can reveal
artificial generation.
    `,
    image: "/imgs/artpreview.jpg",
  },
  {
    id: 9,
    title: "Buildings",
    description: `
In the Buildings course, students learn to spot AI-generated architecture and
cityscapes. Common giveaways include unnatural or inconsistent structural lines,
impossible perspectives, and mismatched windows or doors. Reflections in glass
or water can appear warped, and shadows may not align correctly. Students will
also learn to spot subtle distortions in textures like bricks, tiles, and roofing
patterns that indicate AI manipulation.
    `,
    image: "/imgs/buildingspreview.jpg",
  },
  {
    id: 10,
    title: "Cars",
    description: `
This course helps identify AI-generated vehicles in images. Key signs include
unrealistic proportions, misaligned wheels, odd reflections on surfaces, and
distorted logos. AI often struggles with symmetrical features and fine details
such as headlights, rims, and tire tread patterns. Backgrounds or reflections in
mirrors may be inconsistent with the rest of the image, providing clues that the
image is AI-generated.
    `,
    image: "/imgs/carpreview.jpg",
  },
  {
    id: 11,
    title: "Landscapes",
    description: `
The Landscape course focuses on spotting AI-created natural scenes, including
forests, mountains, and rivers. Students will look for unnatural blending of
elements, repeated patterns in foliage, and inconsistent lighting or shadows.
Clouds, water reflections, and tree branches may appear blurred or unrealistic.
Subtle signs like distorted horizons, floating rocks, or impossible color
gradients can indicate AI manipulation.
    `,
    image: "/imgs/landscapespreview.jpg",
  },
  {
    id: 8,
    title: "People",
    description: `
This course focuses on recognizing AI-generated portraits and human images.
Students will explore subtle inconsistencies in facial features, unnatural skin
textures, and irregular lighting or reflections. Pay attention to asymmetrical
eyes, slightly distorted teeth, or background elements that appear blurred or
inconsistent. AI often struggles with hands, jewelry, and fine details in hair,
so these can be giveaways when analyzing up-close portraits.
    `,
    image: "/imgs/peoplepreview.jpg",
  },
  {
    id: 12,
    title: "Belongings",
    description: `
In this course, students learn to detect AI-generated product images. Watch for
unrealistic textures, overly vibrant colors, and distorted logos or labels.
Shadows and reflections on shiny surfaces may be inconsistent. Small details
like seams, stitching, or packaging edges can appear blurred or warped. AI often
struggles with multiple small objects close together, so cluttered product shots
may reveal artifacts or anomalies.
    `,
    image: "/imgs/goodspreview.jpg",
  }
];



const Home = ({userInfo, setCourse}) => {
    return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="fixed top-0 left-0 w-full bg-[#A3B087] border-b-2 border-[#FFF8D4] z-50">
        <div className="max-w-[1200px] mx-auto px-5 py-3 flex items-center justify-between">
          <Link to="/leaderboard">
            <p className="hover:underline cursor-pointer text-[#313647]">Leaderboard</p>
          </Link>
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
                      id: course.id,
                      name: course.title,
                      description: course.description
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
