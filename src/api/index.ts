import { Router } from "express";
import groupRouter from "@src/api/group";

const router = Router();

router.use("/group", groupRouter);

export default router;
