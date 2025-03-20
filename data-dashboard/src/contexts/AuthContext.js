import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            console.log("Invalid token detected, removing");
            localStorage.removeItem("accessToken");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        setError("Failed to validate authentication");
        localStorage.removeItem("accessToken");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = () => {
    const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      `${window.location.origin}/callback`
    );
    const scope = "read:user";
    const state = Math.random().toString(36).substring(7);

    localStorage.setItem("oauth_state", state);

    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  const handleCallback = async (code, state) => {
    setLoading(true);
    try {
      const savedState = localStorage.getItem("oauth_state");
      if (state !== savedState) {
        throw new Error("OAuth state mismatch");
      }

      localStorage.removeItem("oauth_state");

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/github`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to exchange code for token");
      }

      const data = await response.json();
      console.log("Token response:", data);

      if (!data.access_token) {
        throw new Error("No access token received");
      }

      localStorage.setItem("accessToken", data.access_token);

      const token = data.access_token;
      console.log("Using token:", token);

      const userResponse = await fetch("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error(`Failed to fetch user data: ${userResponse.status}`);
      }

      const userData = await userResponse.json();
      setUser(userData);
      navigate("/dashboard");
    } catch (err) {
      console.error("Authentication error:", err);
      setError(err.message);
      navigate("/login", { state: { error: err.message } });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    handleCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
