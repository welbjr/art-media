const express = require("express");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

// todo: checkAuth

const routes = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

routes.post("/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { name, email, sub: googleId } = ticket.getPayload();
  const [user, created] = await User.findOrCreate({
    where: { googleId },
    defaults: {
      name,
      googleId,
    },
  });
  return res.json({ token, name, email });
});

module.exports = routes;
