import { Router } from "express";
import CreateController from "@src/controllers/services/agenda/CreateController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import FindAllController from "@src/controllers/services/agenda/FindAllByGroupNameController";
import FindOneController from "@src/controllers/services/agenda/FindOneController";
const router = Router();

router.get(
    "/:groupName",
    new JwtVerifyAccessController().excute(),
    new FindAllController().excute()
);

router.get(
    "/:groupName/:id",
    new JwtVerifyAccessController().excute(),
    new FindOneController().excute()
);

router.post(
    "/:groupName",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

export default router;
