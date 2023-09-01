import asyncHandler from "express-async-handler";

const getLeaderboard = asyncHandler(async (req, res, next) => {
  res.status(200).send("Leaderboard requested");
});

const postNewFight = asyncHandler(async (req, res, next) => {
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw new Error('No body found in "postNewFight" request.');
  }

  res.status(200).send(`Fight data received: ${JSON.stringify(body)}`);
});

export { getLeaderboard, postNewFight };
