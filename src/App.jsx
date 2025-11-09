import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Try to read user info from cookie
    const userCookie = Cookies.get("user");

    if (!userCookie) {
      // No cookie → force logout
      navigate("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(userCookie);
      setUser(parsedUser);
    } catch (err) {
      console.error("Invalid user cookie:", err);
      Cookies.remove("user");
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    navigate("/");
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h3>Loading user data...</h3>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.name || user.username || user.email} 👋</h1>
      <p>Email: {user.email}</p>

      <div style={{ marginTop: "30px" }}>
        <p>This is your main app dashboard.</p>
        <p>You can add your task management, analytics, or any other features here.</p>
      </div>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "30px",
          padding: "10px 20px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default App;
