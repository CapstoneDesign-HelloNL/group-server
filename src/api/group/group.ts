import { Router } from "express";
import GroupCreateController from "@src/controllers/services/group/GroupCreateController";
import CheckAlreadyExistGroupController from "@src/controllers/services/group/CheckAlreadyExistGroupController";

const router = Router();

router.post(
    "/",
    new CheckAlreadyExistGroupController().excute(),
    new GroupCreateController().excute()
);

export default router;
