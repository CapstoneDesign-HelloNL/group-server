import { Router } from "express";
import groupRouter from "@src/api/group";

const router = Router({ mergeParams: true });

router.use("/group", groupRouter);

export default router;
