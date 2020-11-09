import { Router } from "express";
import GroupAgendaCreateController from "@src/controllers/services/groupAgenda/GroupAgendaCreateController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
const router = Router();

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new GroupAgendaCreateController().excute()
);

export default router;
