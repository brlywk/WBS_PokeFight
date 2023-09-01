import asyncHandler from "express-async-handler";
import Fight from "../schema/fightSchema.js";

const getLeaderboard = asyncHandler(async (req, res, next) => {
  const { n = 10 } = req.query;
  const { page = 1 } = req.query;

  console.log("n", n, "page", page);

  const results = await Fight.find()
    .sort("-createdAt")
    .skip(startAt)
    .limit(n)
    .exec();

  res.status(200).json(results);
});

const postNewFight = asyncHandler(async (req, res, next) => {
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw new Error('No body found in "postNewFight" request.');
  }

  res.status(200).send(`Fight data received: ${JSON.stringify(body)}`);
});

export { getLeaderboard, postNewFight };
