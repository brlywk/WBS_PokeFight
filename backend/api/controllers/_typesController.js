import asyncHandler from "express-async-handler";
import Type from "../schema/_typeEffectSchema.js";

/**
 * @desc    Returns all Pokemon types
 */
const getTypes = asyncHandler(async (req, res, next) => {
  const result = await Type.find({});

  if (!result) {
    return res.status(400).json({
      message: `No Types found.`,
    });
  }

  res.status(200).json(result);
});

/**
 * @desc    Returns a single type information by ID
 */
const getTypeByName = asyncHandler(async (req, res, next) => {
  const { type } = req.params;

  const typeRegex = new RegExp(type, "i");

  const result = await Type.findOne({ type: typeRegex });

  if (!result) {
    return res
      .status(400)
      .json({ message: `Nothing found for type "${type}"` });
  }

  res.status(200).json(result);
});

export { getTypes, getTypeByName };
