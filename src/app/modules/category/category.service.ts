import { StatusCodes } from "http-status-codes";
import ApiError from "../../../errors/ApiErrors";
import { ICategory } from "./category.interface";
import { Category } from "./category.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createCategoryIntoDB = async (data: ICategory) => {
  // if have than shwo the error
  const isExistCategory = await Category.findOne({ title: data.title });
  if (isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `${data.title} already exists`);
  }
  const result = await Category.create(data);
  if (!result) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Failed to create category");
  }
  return result;
};

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(
    Category.find({ categoryStatus: true }).lean(),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields()
    .search(["title"]);
  const data = await queryBuilder.modelQuery.exec();
  const paginationInfo = await queryBuilder.getPaginationInfo();
  return { data, paginationInfo };
};

const getSingleCategoryFromDB = async (id: string) => {
  const result = await Category.findById(id).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
  }
  return result;
};

const updateCategoryIntoDB = async (id: string, data: ICategory) => {
  // if have than shwo the error
  const isExistCategory = await Category.findOne({ title: data.title });
  if (isExistCategory) {
    throw new ApiError(StatusCodes.BAD_REQUEST, `${data.title} already exists`);
  }
  const result = await Category.findByIdAndUpdate(id, data, {
    new: true,
  }).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
  }
  return result;
};

const deleteCategoryFromDB = async (id: string) => {
  const result = await Category.findByIdAndDelete(id).lean();
  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Category not found");
  }
  return result;
};

export const CategoryService = {
  createCategoryIntoDB,
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  updateCategoryIntoDB,
  deleteCategoryFromDB,
};
