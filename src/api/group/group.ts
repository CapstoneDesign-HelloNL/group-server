import { Router } from "express";
import CreateController from "@src/controllers/services/group/CreateController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import FindByNameController from "@src/controllers/services/group/FindByNameController";
import FindSignUpController from "@src/controllers/services/group/FindSignUpController";
const router = Router();

router.get(
    "/",
    new JwtVerifyAccessController().excute(),
    new FindByNameController().excute()
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

export default router;
