import { Router } from "express";
import FindOneController from "@src/controllers/services/photo/FindOneController";
import FindAllController from "@src/controllers/services/photo/FindAllController";
import CreateController from "@src/controllers/services/photo/CreateController";
import UpdateController from "@src/controllers/services/photo/UpdateController";
import DeleteController from "@src/controllers/services/photo/DeleteController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
const router = Router({ mergeParams: true });

router.get(
    "/:id",
    new JwtVerifyAccessController().excute(),
    new FindOneController().excute()
);
router.get(
    "/",
    new JwtVerifyAccessController().excute(),
    new FindAllController().excute()
);

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

router.put(
    "/:id",
    new JwtVerifyAccessController().excute(),
    new UpdateController().excute()
);
router.delete(
    "/:id",
    new JwtVerifyAccessController().excute(),
    new DeleteController().excute()
);

export default router;
