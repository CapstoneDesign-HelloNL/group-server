import { Op } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import Group from "@src/models/group/GroupModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import Member from "@src/models/member/MemberModel";
import { GroupTypes } from "@src/vo/group/controllers/Group";
import { MemberTypes } from "@src/vo/group/controllers/Member";
import { GroupModelTypes } from "@src/vo/group/models/GroupModel";
import ReqData from "@src/vo/group/services/reqData";

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

    async findSignUp({ decoded }: ReqData): Promise<Member | null | undefined> {
        let member: Member | null = null;
        try {
            member = await Member.findOne({
                where: {
                    email: decoded?.email
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
        data,
        decoded
    }: ReqData): Promise<Group[] | null | undefined> {
        let group: Group[] | null = null;
        try {
            group = await Group.findAll({
                //Group이면 밑에 include에 group 클래스 내부에 정의한 association을 적어준다.
                where: {
                    name: {
                        [Op.like]: `%${data?.name}%`
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

    async save({ data, decoded }: ReqData): Promise<Group | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let newGroup: Group | null = null;
        let newMember: Member | null = null;
        let findMember: Member | null = null;
        const advisor = "관리자";
        try {
            newGroup = await Group.create({ ...data?.groupData, advisor });
            findMember = await Member.findByPk(decoded?.email);
            newMember =
                findMember != null ? findMember : await Member.create(decoded);
            await newGroup.addMember(newMember);
            await newMember.addMemberToGroup(newGroup);
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return newGroup;
    }

    async update({ data, decoded }: ReqData): Promise<any | null | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let updateGroup: any | null = null;
        try {
            updateGroup = await Group.update(
                { ...data?.afterGroupData },
                { where: { ...data?.groupData } }
            );
        } catch (err) {
            logger.error(err);
            return undefined;
        }
        return updateGroup;
    }

    async delete({ data, decoded }: ReqData): Promise<number | undefined> {
        if (process.env.NODE_ENV === "test") await Group.sync({ force: true });

        let deleteGroup: number | null = null;
        try {
            deleteGroup = await Group.destroy({
                where: {
                    ...data
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
