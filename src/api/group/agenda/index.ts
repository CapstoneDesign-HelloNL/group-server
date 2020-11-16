import { Router } from "express";
import CreateController from "@src/controllers/services/agenda/CreateController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import FindAllController from "@src/controllers/services/agenda/FindAllController";
import FindOneController from "@src/controllers/services/agenda/FindOneController";
const router = Router();

router.get(
    "/",
    new JwtVerifyAccessController().excute(),
    new FindAllController().excute()
);

router.get(
    "/:id",
    new JwtVerifyAccessController().excute(),
    new FindOneController().excute()
);

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

export default router;
