import { StatusCodes } from "http-status-codes";
import { DocumentService } from "./Document.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";

const createDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await DocumentService.createDocumentIntoDB(
    req.body,
    req.user!
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Document created successfully",
    data: result,
  });
});

const getAllDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await DocumentService.getAllDocumentFromDB(
    req.user!,
    req.query
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Document fetched successfully",
    pagination: result.paginationInfo,
    data: result.data,
  });
});

const getSingleDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await DocumentService.getSingleDocumentFromDB(
    req.params.id,
    req.user!
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Document fetched successfully",
    data: result,
  });
});

const updateDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await DocumentService.updateDocumentIntoDB(
    req.params.id,
    req.body,
    req.user!
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Document updated successfully",
    data: result,
  });
});

const deleteDocument = catchAsync(async (req: Request, res: Response) => {
  const result = await DocumentService.deleteDocumentFromDB(
    req.params.id,
    req.user!
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Document deleted successfully",
    data: result,
  });
});

const getAllDocumentForSuperAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await DocumentService.getAllDocumentFromDBForSuperAdmin(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Document fetched successfully",
    pagination: result.paginationInfo,
    data: result.data,
  });
});

export const DocumentController = {
  createDocument,
  getAllDocument,
  getSingleDocument,
  updateDocument,
  deleteDocument,
  getAllDocumentForSuperAdmin,
};
