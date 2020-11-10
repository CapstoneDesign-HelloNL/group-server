import { Router } from "express";
import GroupCreateController from "@src/controllers/services/group/GroupCreateController";
import CheckAlreadyExistGroupController from "@src/controllers/services/group/CheckAlreadyExistGroupController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import GroupFindByNameController from "@src/controllers/services/group/GroupFindByNameController";
const router = Router();

router.get(
    "/",
    new JwtVerifyAccessController().excute(),
    new GroupFindByNameController().excute()
);
router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CheckAlreadyExistGroupController().excute(),
    new GroupCreateController().excute()
);

export default router;
