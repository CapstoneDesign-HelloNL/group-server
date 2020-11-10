import { Router } from "express";
import mainRouter from "@src/api/group/group";
import agendaRouter from "@src/api/group/agenda";
import noticeRouter from "@src/api/group/notice";
import galleryRouter from "@src/api/group/gallery";
import scheduleRouter from "@src/api/group/schedule";

const router = Router();

router.use("/", mainRouter);
router.use("/agenda", agendaRouter);
router.use("/notice", noticeRouter);
router.use("/gallery", galleryRouter);
router.use("/schedule", scheduleRouter);

export default router;
