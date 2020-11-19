import { Router } from "express";
import groupRouter from "@src/api/group";
import expressWs from "express-ws";

const router = Router({ mergeParams: true }) as expressWs.Router;

router.use("/group", groupRouter);

export default router;
