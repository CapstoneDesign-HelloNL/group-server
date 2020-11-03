import { Router } from "express";
import GroupAgendaCreateController from "@src/controllers/services/groupAgenda/GroupAgendaCreateController";
const router = Router();

router.post("/", new GroupAgendaCreateController().excute());

export default router;
