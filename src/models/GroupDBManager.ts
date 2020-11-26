import { Sequelize, Transaction } from "sequelize";
import LogService from "@src/utils/LogService";
import DBManager from "@src/models/DBManager";

class GroupDBManager extends DBManager {
    private static instance: GroupDBManager;
    private constructor() {
        super();
        this.connection = new Sequelize(
            process.env.DATABASE || "postgres",
            process.env.DB_USERNAME || "postgres",
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                port: 5434,
                dialect: "postgres",
                pool: {
                    max: 20,
                    min: 5,
                    idle: 100000,
                    acquire: 50000,
                    evict: 50000
                },
                logging: LogService.getInstance().info.bind(
                    LogService.getLogger()
                )
            }
        );
        async () => await this.checkConnection();
    }

    protected static setSingleton(): void {
        if (this.instance == null) this.instance = new this();
    }
    static getInstance(): GroupDBManager {
        if (this.instance == null) this.setSingleton();
        return this.instance;
    }

    async checkConnection(): Promise<void> {
        await this.connection
            .authenticate()
            .then(() =>
                LogService.getInstance().info(
                    "Connection has been established successfully."
                )
            )
            .catch((err) =>
                LogService.getInstance().error(
                    `Unable to connect to the database: ${err}`
                )
            );
    }
    getConnection(): Sequelize {
        return this.connection;
    }
    async getTransaction(): Promise<Transaction> {
        return await this.connection.transaction();
    }
    async sync(): Promise<void> {
        await this.connection.sync();
    }
    async endConnection(): Promise<void> {
        await this.connection
            .close()
            .then(() => LogService.getInstance().info("Connection end"))
            .catch((err) => LogService.getInstance().error(err));
    }
}

export default GroupDBManager;
