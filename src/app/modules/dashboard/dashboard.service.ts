import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "../user/user.interface";
import { Types } from "mongoose";

const getAllUserFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  const result = new QueryBuilder(User.find({ verified: true }), query)
    .search(["name", "email"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const data = await result.modelQuery.exec();
  const meta = await result.getPaginationInfo();

  return { data, meta };
};

// =================
// user banned as a admin
// =================
const userBannedAsAdmin = async (
  payload: { isDeleted: boolean },
  id: string
) => {
  console.log(payload);
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: payload.isDeleted },
    { new: true }
  );

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return result;
};

// =================
// delete user as a admin
// =================
const deleteUserAsAdmin = async (id: string) => {
  const result = await User.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  return result;
};

const addUserAsAAdminIntoDB = async (payload: IUser, user: JwtPayload) => {
  payload.verified = true;
  const result = await User.create(payload);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create user");
  }
  return result;
};

// =========
// edit user
// =========
const editUserAsAdminFromDB = async (payload: IUser, id: string) => {
  const result = await User.findByIdAndUpdate(new Types.ObjectId(id), payload, { new: true });
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to update user");
  }
  return result
};

export const DashboardService = {
  getAllUserFromDB,
  userBannedAsAdmin,
  deleteUserAsAdmin,
  addUserAsAAdminIntoDB,
  editUserAsAdminFromDB
};
