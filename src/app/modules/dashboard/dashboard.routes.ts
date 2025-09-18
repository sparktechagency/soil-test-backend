import express from "express";
import { dashboardController } from "./dashboard.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";

const router = express.Router();

router.get(
  "/users",
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  dashboardController.getAllUser
);

router.patch(
  "/users/:id",
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  dashboardController.userBannedAsAdminFromDB
);

router.delete(
  "/users/:id",
  auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN),
  dashboardController.deleteUserFromDBAsaAdmin
);

export const DashboardRoutes = router;
