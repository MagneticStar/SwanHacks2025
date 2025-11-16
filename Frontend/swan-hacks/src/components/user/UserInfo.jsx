import { Link, Navigate, useNavigate } from "react-router-dom";


export default function UserInfo({ userInfo, setUserInfo }) {
  if (!userInfo || !userInfo.id) {
    return <Navigate to="/login" replace />;
  }

  const navigate = useNavigate();

  function logOut() {
    // Remove token from localStorage
    localStorage.removeItem('authToken');
    
    // Reset user state
    setUserInfo({
      id: '',
      name: '',
      email: '',
      elo: '',
      token: ''
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 py-10">
      <div className="w-full max-w-md bg-[#FFF8D4] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-[#313647] mb-6">User Info</h1>

        <div className="flex flex-col gap-3 text-[#313647] mb-6">
          <p>
            <strong>Elo:</strong> <span className="text-[#A3B087]">{userInfo.elo}</span>
          </p>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-2">
          {/* Delete Account Button */}
          <Link to="/delete-user">
            <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition">
              Delete Account
            </button>
          </Link>

          <button onClick={logOut} className="bg-[#A3B087] text-[#313647] font-bold py-2 px-4 rounded hover:bg-[#8c9a6d] transition">
            Log Out
          </button>

          {/* Back Button */}
          <Link to="/">
            <button className="bg-[#A3B087] text-[#313647] font-bold py-2 px-4 rounded hover:bg-[#8c9a6d] transition">
              Back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
