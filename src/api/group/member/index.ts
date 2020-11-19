import { Router } from "express";
import FindOneController from "@src/controllers/services/member/FindOneController";
import FindAllController from "@src/controllers/services/member/FindAllController";
import CreateController from "@src/controllers/services/member/CreateController";
import DeleteController from "@src/controllers/services/member/DeleteController";
import JwtVerifyAccessController from "@src/controllers/middlewares/jwt/JwtVerifyAccessController";
import expressWs from "express-ws";
import KafkaManager from "@src/models/KafkaManager";

const router = Router({ mergeParams: true }) as expressWs.Router;

router.get(
    "/:email",
    new JwtVerifyAccessController().excute(),
    new FindOneController().excute()
);
router.get(
    "/",
    new JwtVerifyAccessController().excute(),
    new FindAllController().excute()
);

router.post(
    "/",
    new JwtVerifyAccessController().excute(),
    new CreateController().excute()
);

router.ws("/", (ws, req, next) => {
    ws.on("message", async (msg: String) => {
        const kafka = KafkaManager.getInstance();
        const consumer = kafka
            .getConnection()
            .consumer({ groupId: "memberUser" });
        await consumer.connect();
        await consumer.subscribe({ topic: "userMember", fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                ws.send(message.value?.toString());
            }
        });
    });
    // new CreateController().excute();
});

router.delete(
    "/:email",
    new JwtVerifyAccessController().excute(),
    new DeleteController().excute()
);

export default router;
