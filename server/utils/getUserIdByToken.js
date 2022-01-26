const { OAuth2Client } = require("google-auth-library");
const models = require("../models");

module.exports = async function getUserIdByToken(userToken) {
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  const ticket = await client.verifyIdToken({
    idToken: userToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { sub: googleId } = ticket.getPayload();

  const user = await models.User.findAll({
    where: {
      googleId,
    },
  });
  const userId = user[0].id;
  return userId;
};
