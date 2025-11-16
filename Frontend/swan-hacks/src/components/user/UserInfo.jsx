import { Link, Navigate } from "react-router-dom";

export default function UserInfo({ userInfo }) {

    if (!userInfo || !userInfo.id) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
      <h1>User Info</h1>

      {userInfo && userInfo.id ? (
        <div style={{ marginTop: "1rem" }}>
          <p><strong>Elo:</strong> {userInfo.elo}</p>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
          <Link to="/delete-user">Delete user</Link>
        </div>
      ) : (
        <p>No user info available.</p>
      )}
    </div>
  );
}
