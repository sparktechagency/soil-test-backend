import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/category/category.routes";
import { DocumentRoutes } from "../modules/Document/Document.routes";
import { DashboardRoutes } from "../modules/dashboard/dashboard.routes";
import { ruleRoutes } from "../modules/rule/rule.route";
const router = express.Router();

const apiRoutes = [
  { path: "/user", route: UserRoutes },
  { path: "/auth", route: AuthRoutes },
  { path: "/category", route: CategoryRoutes },
  { path: "/document", route: DocumentRoutes },
  { path: "/dashboard", route: DashboardRoutes },
  { path: "/rule", route: ruleRoutes },
];

apiRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
