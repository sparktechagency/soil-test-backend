import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { IDocument } from "./Document.interface";
import { Document } from "./Document.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
import { USER_ROLES } from "../../../enums/user";

const createDocumentIntoDB = async (data: IDocument, user: JwtPayload) => {
  data.user = user.id;
  const result = await Document.create(data);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create document");
  }
  return result;
};

const getAllDocumentFromDB = async (
  user: JwtPayload,
  query: Record<string, unknown>
) => {
  const queryBuilder = new QueryBuilder(
    Document.find({ user: user.id }).lean(),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields()
    .search(["title"])
    .populate(["category"], { category: "title" });
  const result = await queryBuilder.modelQuery.exec();
  const paginationInfo = await queryBuilder.getPaginationInfo();
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to get document");
  }
  return { data: result, paginationInfo };
};

const getSingleDocumentFromDB = async (id: string, user: JwtPayload) => {
  const result = await Document.findById(id).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Document not found");
  }
  return result;
};

const updateDocumentIntoDB = async (
  id: string,
  data: IDocument,
  user: JwtPayload
) => {
  const result = await Document.findByIdAndUpdate(
    id,
    data,
    { user: user.id },
    // @ts-ignore
    {
      new: true,
    }
  ).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Document not found");
  }
  return result;
};

const deleteDocumentFromDB = async (id: string, user: JwtPayload) => {
  const result = await Document.findByIdAndDelete(id, { user: user.id }).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Document not found");
  }
  return result;
};

export const DocumentService = {
  createDocumentIntoDB,
  getAllDocumentFromDB,
  getSingleDocumentFromDB,
  updateDocumentIntoDB,
  deleteDocumentFromDB,
};
