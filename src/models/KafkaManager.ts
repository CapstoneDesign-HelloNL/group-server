import { Kafka } from "kafkajs";
import DBManager from "@src/models/DBManager";

class KafkaManager extends DBManager {
    protected connection: Kafka | undefined;

    constructor() {
        super();
        this.connection = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9093", "localhost:9094"]
        });
    }

    getConnection(): Kafka | undefined {
        return this.connection;
    }
    endConnection(): void {}
}

export default KafkaManager;
