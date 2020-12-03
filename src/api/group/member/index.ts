import { Router } from "express";
import FindOneController from "@src/controllers/services/member/FindOneController";
import FindAllController from "@src/controllers/services/member/FindAllController";
import CreateController from "@src/controllers/services/member/CreateController";
import UpdateController from "@src/controllers/services/member/UpdateController";
import DeleteController from "@src/controllers/services/member/DeleteController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";

const router = Router({ mergeParams: true });

router.get(
    "/:memberEmail",
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
    "/:memberEmail",
    new JwtVerifyAccessController().excute(),
    new UpdateController().excute()
);
router.delete(
    "/:memberEmail",
    new JwtVerifyAccessController().excute(),
    new DeleteController().excute()
);

export default router;
