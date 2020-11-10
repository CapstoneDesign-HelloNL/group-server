import { Router } from "express";
import FindAllByGroupNameController from "@src/controllers/services/notice/FindAllByGroupNameController";
import CreateController from "@src/controllers/services/notice/CreateController";
import UpdateController from "@src/controllers/services/notice/UpdateController";
import DeleteController from "@src/controllers/services/notice/DeleteController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
const router = Router();

router.get(
    "/:groupName",
    new JwtVerifyAccessController().excute(),
    new FindAllByGroupNameController().excute()
);

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);
router.put(
    "/",
    new JwtVerifyAccessController().excute(),
    new UpdateController().excute()
);
router.delete(
    "/",
    new JwtVerifyAccessController().excute(),
    new DeleteController().excute()
);

export default router;
