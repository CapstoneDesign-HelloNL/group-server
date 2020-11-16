import { Router } from "express";
import agendaRouter from "@src/api/group/agenda";
import noticeRouter from "@src/api/group/notice";
import galleryRouter from "@src/api/group/gallery";
import scheduleRouter from "@src/api/group/schedule";

import CreateController from "@src/controllers/services/group/CreateController";
import UpdateController from "@src/controllers/services/group/UpdateController";
import DeleteController from "@src/controllers/services/group/DeleteController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import FindAllController from "@src/controllers/services/group/FindAllController";
import FindSignUpController from "@src/controllers/services/group/FindSignUpController";
import FindOneController from "@src/controllers/services/group/FindOneController";

const router = Router({ mergeParams: true });

router.use("/:groupName/agenda", agendaRouter);
router.use("/:groupName/notice", noticeRouter);
router.use("/:groupName/gallery", galleryRouter);
router.use("/:groupName/schedule", scheduleRouter);

router.get(
    "/one/:groupName",
    new JwtVerifyAccessController().excute(),
    new FindOneController().excute()
);
router.get(
    "/all/:groupName",
    new JwtVerifyAccessController().excute(),
    new FindAllController().excute()
);
router.get(
    "/signup",
    new JwtVerifyAccessController().excute(),
    new FindSignUpController().excute()
);
router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);
router.put(
    "/:groupName",
    new JwtVerifyAccessController().excute(),
    new UpdateController().excute()
);
router.delete(
    "/:groupName",
    new JwtVerifyAccessController().excute(),
    new DeleteController().excute()
);

export default router;
