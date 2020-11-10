import { Op } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import Group from "@src/models/group/GroupModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import { GroupTypes } from "@src/vo/group/controllers/Group";
import Member from "@src/models/member/MemberModel";
import { MemberTypes } from "@src/vo/group/controllers/Member";
import ReqData from "@src/vo/group/services/reqData";
import { GroupModelTypes } from "@src/vo/group/models/GroupModel";

const logger = LogService.getInstance();
class GroupDao extends Dao {
    protected constructor() {
        super();
        this.db = GroupDBManager.getInstance();
    }
    protected async connect() {
        this.db = GroupDBManager.getInstance();
    }

    protected async endConnect() {
        await this.db?.endConnection();
    }

    async find(name: string, email: string): Promise<Group | null | undefined> {
        let group: Group | null = null;
        try {
            group = await Group.findOne({
                where: {
                    name
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return group;
    }

    async findSignUp({
        decoded: { email }
    }: ReqData): Promise<Member | null | undefined> {
        let member: Member | null = null;
        try {
            member = await Member.findOne({
                where: {
                    email
                },
                include: [
                    {
                        model: Group,
                        as: "memberToGroup",
                        attributes: ["name"]
                    }
                ]
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return member;
    }

    async findByName({
        data: { name },
        decoded: { email }
    }: ReqData): Promise<Group[] | null | undefined> {
        let group: Group[] | null = null;
        try {
            group = await Group.findAll({
                //Group이면 밑에 include에 group 클래스 내부에 정의한 association을 적어준다.
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
                // include: [
                //     {
                //         model: Member,
                //         where: { email },
                //         as: "members",
                //         attributes: ["email"]
                //     }
                // ]
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return group;
    }

    async findAll(name: string): Promise<Group[] | null | undefined> {
        let groups: Group[] | null = null;
        console.log(groups);
        try {
            groups = await Group.findAll({
                where: {
                    name
                },
                include: Member
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return groups;
    }

    async save({
        data: { name, admin, advisor },
        decoded: { email }
    }: ReqData): Promise<Group | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let newGroup: Group | null = null;
        let newMember: Member | null = null;
        let findMember: Member | null = null;
        advisor = "관리자";
        try {
            const groupInput: GroupTypes.GroupBody = { name, admin, advisor };
            const memberInput: MemberTypes.MemberBody = { email };
            console.log("IS HERE?");
            newGroup = await Group.create(groupInput);
            findMember = await Member.findByPk(email);
            newMember =
                findMember != null
                    ? findMember
                    : await Member.create(memberInput);
            await newGroup.addMember(newMember);
            await newMember.addMemberToGroup(newGroup);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroup;
    }

    async update({
        data: { groupData, afterGroupData },
        decoded: { email }
    }: ReqData): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let updateGroup: any | null = null;
        try {
            updateGroup = await Group.update(
                { ...afterGroupData },
                { where: { ...groupData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGroup;
    }

    async delete({
        data: { name, admin, advisor },
        decoded: { email }
    }: ReqData): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let deleteGroup: number | null = null;
        try {
            deleteGroup = await Group.destroy({
                where: {
                    name,
                    admin,
                    advisor
                }
            });
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return deleteGroup; //1 is success, 0 or undefined are fail
    }
}

export default GroupDao;
