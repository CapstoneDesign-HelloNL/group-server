import { Router } from "express";
import FindOneController from "@src/controllers/services/gallery/FindOneController";
import FindAllController from "@src/controllers/services/gallery/FindAllController";
import CreateController from "@src/controllers/services/gallery/CreateController";
import UpdateController from "@src/controllers/services/gallery/UpdateController";
import DeleteController from "@src/controllers/services/gallery/DeleteController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";

import postRouter from "@src/api/group/gallery/post";

const router = Router({ mergeParams: true });

router.use("/:galleryName/post", postRouter);

router.get(
    "/:galleryName",
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
    "/:galleryName",
    new JwtVerifyAccessController().excute(),
    new UpdateController().excute()
);
router.delete(
    "/:galleryName",
    new JwtVerifyAccessController().excute(),
    new DeleteController().excute()
);

export default router;
