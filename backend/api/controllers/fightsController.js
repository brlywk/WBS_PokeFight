import asyncHandler from "express-async-handler";
import Fight from "../schema/fightSchema.js";

/**
 * @desc    Returns all fights ordered by creation date descending
 */
const getAllFights = asyncHandler(async (req, res, next) => {
  const { n = 10 } = req.query;
  const { page = 1 } = req.query;

  const startAt = (page - 1) * n;

  console.log("n", n, "page", page);

  const results = await Fight.find()
    .sort("-createdAt")
    .skip(startAt)
    .limit(n)
    .exec();

  res.status(200).json(results);
});

/**
 * @desc    Adds a new fight to the database
 */
const postNewFight = asyncHandler(async (req, res, next) => {
  const { body } = req;

  if (!body || Object.keys(body).length === 0) {
    throw new Error('No body found in "postNewFight" request.');
  }

  const result = await Fight.create(body);

  const location = `${req.protocol}://${req.get("host")}/api/fights/${
    result._id
  }`;

  console.log(location);

  res.location(location).status(201).end();
});

/**
 * @desc    Returns a fight by its ID
 */
const getFightById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  // we don't necessarily check if id exists, because if it doesn't
  // the getAllFights route will take over

  const result = await Fight.findOne({ _id: id });

  if (!result) {
    return res.status(400).json({
      message: `No fight found for ID ${id}`,
    });
  }

  res.status(200).json(result);
});

export { getAllFights, postNewFight, getFightById };
