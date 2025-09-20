import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { RuleService } from "./rule.service";

const createPrivacyPolicy = catchAsync(async (req: Request, res: Response) => {
  const result = await RuleService.createOrUpdateRuleIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${req.body.type} created successfully`,
    data: result,
  });
});

const getAllRules = catchAsync(async (req: Request, res: Response) => {
  const result = await RuleService.getAllRuleFromDB(req.params.type);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${req.params.type} fetched successfully`,
    data: result,
  });
});

export const RuleController = {
  createPrivacyPolicy,
  getAllRules,
};
