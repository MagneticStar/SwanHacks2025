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
          <p><strong>ID:</strong> {userInfo.id}</p>
          <p><strong>Name:</strong> {userInfo.name}</p>
          <p><strong>Username:</strong> {userInfo.username}</p>
          <p><strong>Elo:</strong> {userInfo.elo}</p>
          <Link src="./delete-user">Delete user</Link>
        </div>
      ) : (
        <p>No user info available.</p>
      )}
    </div>
  );
}
