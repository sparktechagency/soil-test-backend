import { User } from "../user/user.model";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import { JwtPayload } from "jsonwebtoken";

const getAllUserFromDB = async (
  query: Record<string, unknown>,
  user: JwtPayload
) => {
  const result = new QueryBuilder(User.find(query), query)
    .paginate()
    .search(["name", "email"])
    .fields()
    .sort();
  const data = await result.modelQuery.exec();
  const meta = await result.getPaginationInfo();
  if (!data) {
    return { data: [], meta };
  }
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


export const DashboardService = {
  getAllUserFromDB,
  userBannedAsAdmin,
  deleteUserAsAdmin,
};
