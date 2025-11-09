import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = Cookies.get("accessToken") || Cookies.get("user"); // depending on your login setup
    console.log()
    if (!token) {
      // if no token, redirect to login
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile data.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("accessToken");
    navigate("/login");
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Loading profile...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.username} 👋</h1>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {user.joined}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;
