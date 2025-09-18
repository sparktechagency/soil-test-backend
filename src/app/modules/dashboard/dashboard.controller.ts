import catchAsync from "../../../shared/catchAsync";
import { DashboardService } from "./dashboard.service";
import sendResponse from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await DashboardService.getAllUserFromDB(req.query, req.user!);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User fetched successfully",
    pagination: result.meta,
    data: result.data,
  });
});

const userBannedAsAdminFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await DashboardService.userBannedAsAdmin(req.body, req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "User banned successfully",
      data: result,
    });
  });   

const deleteUserFromDBAsaAdmin = catchAsync(async(req:Request,res:Response)=>{
    const result = await DashboardService.deleteUserAsAdmin(req.params.id);
    sendResponse(res,{
        statusCode:StatusCodes.OK,
        success:true,
        message:"User deleted successfully",
        data:result
    })
})

export const dashboardController = {
    getAllUser,
    userBannedAsAdminFromDB,
    deleteUserFromDBAsaAdmin
}