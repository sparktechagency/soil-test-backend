import { Router } from "express";
import { RuleController } from "./rule.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";

const router = Router();
router.post(
  "/create",
  auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
  RuleController.createPrivacyPolicy
);
router.get("/:type", RuleController.getAllRules);

export const ruleRoutes = router;
