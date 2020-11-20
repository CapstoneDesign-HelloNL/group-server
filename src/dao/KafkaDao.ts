import KafkaManager from "@src/models/KafkaManager";
import Dao from "@src/dao/Dao";
import { Consumer, Producer } from "kafkajs";
import MemberDao from "./member/MemberDao";
import Member from "@src/models/member/MemberModel";
import KafkaData from "@src/vo/group/services/kafkaData";

interface producers {
    [attr: string]: Producer;
}

interface consumers {
    [attr: string]: Consumer;
}
// interface messageFuncs {
//     [attr: string]: (payload: EachMessagePayload) => Promise<void>;
// }
interface producersName {
    [attr: string]: string;
}
interface consumersName {
    [attr: string]: string;
}

class KafkaDao extends Dao {
    protected db: KafkaManager;
    private producers: producers;
    private consumers: consumers;
    private messageFuncs: any;
    private producersName: producersName;
    private consumersName: consumersName;
    private constructor() {
        super();
        this.db = KafkaManager.getInstance();
        this.producers = {};
        this.consumers = {};
        this.producersName = { memberUser: "memberUser" };
        this.consumersName = { userMember: "userMember" };
        this.messageFuncs = {
            userMember: async ({ topic, partition, message }: any) => {
                const received: KafkaData = JSON.parse(message.value);
                if (received.status === "Success") {
                    const saveMemberData = { email: received.data.email };
                    const newMember:
                        | Member
                        | undefined = await MemberDao.getInstance().save({
                        data: saveMemberData
                    });
                    if (newMember instanceof Member) {
                        await this.sendMessage("memberUser", "memberUser", {
                            status: "Success",
                            data: { msg: "Member Create Success!" }
                        });
                    } else {
                        await this.sendMessage("memberUser", "memberUser", {
                            status: "Fail",
                            data: { msg: "Member Create Fail!" }
                        });
                    }
                } else {
                    await this.sendMessage("memberUser", "memberUser", {
                        status: "Fail",
                        data: { msg: "User Create Fail!" }
                    });
                }
            }
        };
        const firstInit = async () => await this.init();
        firstInit();
    }

    protected async connect() {
        this.db = KafkaManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }

    private async producerInit(name: string): Promise<void> {
        const producer = this.db.getConnection().producer();
        await producer.connect();
        this.producers[name] = producer;
    }

    private async consumerInit(name: string, topic: string): Promise<void> {
        const consumer = this.db.getConnection().consumer({ groupId: name });
        await consumer.connect();
        await consumer.subscribe({
            topic
        });
        this.consumers[name] = consumer;
    }

    // private async producerInit(): Promise<void> {
    //     const memberUserProducer = this.db.getConnection().producer();
    //     await memberUserProducer.connect();
    //     this.producers["memberUser"] = memberUserProducer;
    // }

    // private async consumerInit(): Promise<void> {
    //     const userMemberConsumer = this.db
    //         .getConnection()
    //         .consumer({ groupId: "userMember" });
    //     await userMemberConsumer.connect();
    //     await userMemberConsumer.subscribe({
    //         topic: "userMember"
    //     });
    //     this.consumers["userMember"] = userMemberConsumer;
    // }

    private getProducer(name: string): Producer {
        return this.producers[name];
    }
    private getConsumer(name: string): Consumer {
        return this.consumers[name];
    }

    public async sendMessage(
        name: string,
        topic: string,
        data: KafkaData
    ): Promise<void> {
        console.log(data);
        await this.getProducer(name).send({
            topic,
            messages: [{ value: JSON.stringify(data) }]
        });
    }

    public async receiveMessage(name: string) {
        await this.getConsumer(name).run({
            eachMessage: this.messageFuncs[name]
        });
    }

    public async init(): Promise<void> {
        for (let name in this.producersName) await this.producerInit(name);
        for (let name in this.consumersName)
            await this.consumerInit(name, name);
        await this.receiveMessage("userMember");
    }
}

export default KafkaDao;
