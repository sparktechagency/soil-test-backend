import { Router } from "express";
import { categoryValidation } from "./category.validation";
import { CategoryController } from "./category.controller";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";

const router = Router();

router
  .route("/")
  .post(
    auth(USER_ROLES.SUPER_ADMIN),
    validateRequest(categoryValidation.createCategoryValidation),
    CategoryController.createCategory
  )
  .get(CategoryController.getAllCategory);

router
  .route("/:id")
  .get(CategoryController.getSingleCategory)
  .patch(
    auth(USER_ROLES.SUPER_ADMIN),
    validateRequest(categoryValidation.updateCategoryValidation),
    CategoryController.updateCategory
  )
  .delete(auth(USER_ROLES.SUPER_ADMIN), CategoryController.deleteCategory);



export const CategoryRoutes = router;
