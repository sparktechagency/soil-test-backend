import ApiError from "../../../errors/ApiErrors";
import { IRule } from "./rule.interface";
import { Rule } from "./rule.model";
import { StatusCodes } from "http-status-codes";

const allowedTypes = ["privacy", "terms"];
const validateType = (type: string) => {
  if (!allowedTypes.includes(type)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid type provided");
  }
};
const createOrUpdateRuleIntoDB = async (data: IRule) => {
  validateType(data.type);
  const existingRule = await Rule.findOne({ type: data.type });
  if (existingRule) {
    await Rule.findOneAndUpdate(
      { type: data.type },
      { ...data },
      { new: true }
    );
    return existingRule;
  }
  const result = await Rule.create(data);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create rule");
  }
  return result;
};

const getAllRuleFromDB = async (type: string) => {
  validateType(type);
  const result = await Rule.find({ type }).lean();
  if (!result) {
    return [];
  }
  return result;
};

export const RuleService = {
  createOrUpdateRuleIntoDB,
  getAllRuleFromDB,
};
