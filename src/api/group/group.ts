import { Router } from "express";
import GroupCreateController from "@src/controllers/services/group/GroupCreateController";
import CheckAlreadyExistGroupController from "@src/controllers/services/group/CheckAlreadyExistGroupController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";

const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CheckAlreadyExistGroupController().excute(),
    new GroupCreateController().excute()
);

export default router;
