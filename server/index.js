const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

app.post("/auth/github", async (req, res) => {
  const { code } = req.body;

  try {
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    res.json(tokenResponse.data);
  } catch (error) {
    console.error("OAuth error:", error);
    res.status(500).json({ error: "Failed to authenticate" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
