import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AuthChoice from "./AuthChoice";

const DynamicLanding = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkToken = async () => {
            const token = Cookies.get("accessToken");
            if (!token) {
                setLoading(false); // No token → show AuthChoice
                return;
            }
            console.log("accessToken: ", token)
            try {
                const res = await axios.get("http://localhost:3001/api/user", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.success) {
                    // Token valid → redirect to profile/dashboard
                    navigate("/profile");
                } else {
                    // Token invalid → clear cookies and redirect to login
                    Cookies.remove("accessToken");
                    Cookies.remove("refreshToken");
                    setLoading(false)
                    navigate("/");
                }
            } catch (err) {
                console.error(err);
                // On any error → clear cookies and redirect to login
                Cookies.remove("accessToken");
                Cookies.remove("refreshToken");
                setLoading(false)
                navigate("/");
            }
        }
        checkToken();
    }, [navigate]);

    if (loading) {
        return <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>;
    }

    return <AuthChoice />; // Show login/signup choice
};

export default DynamicLanding;
