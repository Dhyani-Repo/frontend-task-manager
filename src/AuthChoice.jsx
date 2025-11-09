import React from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css"; // reuse your Auth CSS for styling

const AuthChoice = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome to TaskIt</h2>
        <button
          onClick={() => navigate("/login")}
          style={{ marginBottom: "15px" }}
        >
          Login
        </button>
        <button onClick={() => navigate("/signup")}>Sign Up</button>
        <div className="auth-footer">
          <p>Split Your Days In Task !</p>
        </div>
      </div>
    </div>
  );
};

export default AuthChoice;
