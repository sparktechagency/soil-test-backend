import { Router } from "express";
import { DocumentController } from "./Document.controller";
import auth from "../../middlewares/auth";
import { USER_ROLES } from "../../../enums/user";
import fileUploadHandler from "../../middlewares/fileUploaderHandler";
import { getMultipleFilesPath } from "../../../shared/getFilePath";
import { NextFunction, Request, Response } from "express";

const router = Router();

router
  .route("/upload")
  .post(
    fileUploadHandler(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const document = getMultipleFilesPath(req.files, "document");
        req.body = {
          ...req.body,
          document,
        };
        next();
      } catch (error) {
        next(error);
      }
    },
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    DocumentController.createDocument
  )
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    DocumentController.getAllDocument
  );

// with id
router
  .route("/upload/:id")
  .get(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    DocumentController.getSingleDocument
  )
  .patch(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    fileUploadHandler(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const document = getMultipleFilesPath(req.files, "document");
        req.body = {
          ...req.body,
          document,
        };
        next();
      } catch (error) {
        next(error);
      }
    },
    DocumentController.updateDocument
  )
  .delete(
    auth(USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN, USER_ROLES.USER),
    DocumentController.deleteDocument
  );

export const DocumentRoutes = router;
