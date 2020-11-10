import { Router } from "express";
import groupMainRouter from "@src/api/group/group";
import groupAgendaRouter from "@src/api/group/groupAgenda";
import groupNoticeRouter from "@src/api/group/groupNotice";
import groupGalleryRouter from "@src/api/group/groupGallery";
import groupScheduleRouter from "@src/api/group/groupSchedule";

const router = Router();

router.use("/", groupMainRouter);
router.use("/agenda", groupAgendaRouter);
router.use("/notice", groupNoticeRouter);
router.use("/gallery", groupGalleryRouter);
router.use("/schedule", groupScheduleRouter);

export default router;
