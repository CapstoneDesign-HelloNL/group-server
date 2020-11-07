import GroupDBManager from "@src/models/GroupDBManager";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { MemberTypes } from "@src/vo/group/controllers/Member";
import Group from "@src/models/group/GroupModel";
import Member from "@src/models/member/MemberModel";
/*
update, delete logic need to change
*/
const logger = LogService.getInstance();
class MemberDao extends Dao {
    private constructor() {
        super();
        this.db = new GroupDBManager();
        Group.initiate(this.db.getConnection());
        Member.belongsToMany(Group, { through: "GroupToMember" });
        Group.belongsToMany(Member, { through: "GroupToMember" });

        const firstSync = async () => {
            await Group.sync();
            await Member.sync();
            await this.endConnect();
        };
        firstSync();
    }
    protected async connect() {
        this.db = new GroupDBManager();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }
    async find(id: number): Promise<Member | null | undefined> {
        await this.connect();
        let groupMember: Member | null = null;
        console.log(groupMember);
        try {
            groupMember = await Member.findOne({
                where: {
                    id
                }
            });
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groupMember;
    }

    async findAll(): Promise<Member[] | null | undefined> {
        await this.connect();
        let groups: Member[] | null = null;
        console.log(groups);
        try {
            groups = await Member.findAll();
        } catch (err) {
            logger.error(err);
            await this.endConnect();
            return undefined;
        }
        await this.endConnect();
        return groups;
    }

    async save(
        groupMemberData: MemberTypes.MemberPostBody
    ): Promise<Member | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test") await Member.sync({ force: true });
        // else await Group.sync();

        let newMember: Member | null = null;
        try {
            newMember = await Member.create(groupMemberData);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return newMember;
    }

    async update(
        groupMemberData: MemberTypes.MemberPostBody,
        afterMemberData: MemberTypes.MemberPostBody
    ): Promise<any | null | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test") await Member.sync({ force: true });
        // else await Group.sync();

        let updateMember: any | null = null;
        try {
            updateMember = await Member.update(
                { ...afterMemberData },
                { where: { ...groupMemberData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return updateMember;
    }

    async delete(
        groupMemberData: MemberTypes.MemberPostBody
    ): Promise<number | undefined> {
        await this.connect();
        if (process.env.NODE_ENV === "test") await Member.sync({ force: true });
        // else await Group.sync();

        let deleteMemberGroup: number | null = null;
        try {
            deleteMemberGroup = await Member.destroy({
                where: {
                    ...groupMemberData
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        await this.endConnect();
        return deleteMemberGroup; //1 is success, 0 or undefined are fail
    }
}

export default MemberDao;
