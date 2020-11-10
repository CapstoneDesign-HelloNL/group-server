import { Router } from "express";
import CreateController from "@src/controllers/services/groupAgenda/CreateController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import FindAllByGroupNameController from "@src/controllers/services/groupAgenda/FindAllByGroupNameController";
const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

router.get(
    "/:groupName",
    new JwtVerifyAccessController().excute(),
    new FindAllByGroupNameController().excute()
);

export default router;
