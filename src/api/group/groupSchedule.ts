import { Router } from "express";
import CreateController from "@src/controllers/services/groupSchedule/CreateController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

export default router;
