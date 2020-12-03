import { Router } from "express";
import FindOneController from "@src/controllers/services/post/FindOneController";
import FindAllController from "@src/controllers/services/post/FindAllController";
import CreateController from "@src/controllers/services/post/CreateController";
import UpdateController from "@src/controllers/services/post/UpdateController";
import DeleteController from "@src/controllers/services/post/DeleteController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import photoRouter from "@src/api/group/gallery/post/photo";
import upload from "@src/utils/upload";

const router = Router({ mergeParams: true });

router.use("/:postId/photo", photoRouter);

router.get(
    "/:postId",
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
    upload.array("photos"),
    new CreateController().excute()
);

router.put(
    "/:postId",
    new JwtVerifyAccessController().excute(),
    new UpdateController().excute()
);
router.delete(
    "/:postId",
    new JwtVerifyAccessController().excute(),
    new DeleteController().excute()
);

export default router;
