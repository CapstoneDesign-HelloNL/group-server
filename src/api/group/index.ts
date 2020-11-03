import { Router } from "express";
import groupMainRouter from "@src/api/group/group";
import groupAgendaRouter from "@src/api/group/groupAgenda";

const router = Router();

router.use("/", groupMainRouter);
router.use("/agenda", groupAgendaRouter);

export default router;
