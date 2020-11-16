import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import Group from "@src/models/group/GroupModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import Member from "@src/models/member/MemberModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

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
    async findOne({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Group | string | null | undefined> {
        let group: Group | null = null;
        try {
            group = await Group.findOne({
                where: {
                    name: params.groupName
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return group;
    }

    async findSignUp({
        decoded
    }: ParamsStrictReqData): Promise<Member | string | null | undefined> {
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
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return member;
    }

    async findAll({
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<Group[] | string | null | undefined> {
        let group: Group[] | null = null;
        try {
            group = await Group.findAll({
                //Group이면 밑에 include에 group 클래스 내부에 정의한 association을 적어준다.
                where: {
                    name: {
                        [Op.like]: `%${params?.groupName}%`
                    }
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return group;
    }

    // async findAll({
    //     data,
    //     decoded,
    //     params
    // }: ParamsStrictReqData): Promise<Group[] | string | null | undefined> {
    //     let groups: Group[] | null = null;
    //     try {
    //         groups = await Group.findAll({
    //             where: {
    //                 name: params.groupName
    //             },
    //             include: Member
    //         });
    //     } catch (err) {
    //         logger.error(err);
    //         if (err instanceof ValidationError) return `BadRequest`;
    //         return undefined;
    //     }
    //     return groups;
    // }

    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Group | string | undefined> {
        const transaction = await this.db?.getConnection().transaction();
        let newGroup: Group | null = null;
        let newMember: [Member, boolean] | null = null;
        try {
            newGroup = await Group.create({ ...data }, { transaction });
            newMember = await Member.findOrCreate({
                where: { email: decoded.email },
                transaction
            });

            await newGroup.addMember(newMember[0], { transaction });
            await newMember[0].addMemberToGroup(newGroup, { transaction });
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newGroup;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updateGroup: unknown | null = null;
        try {
            updateGroup = await Group.update(
                { ...data },
                { where: { name: params.groupName } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updateGroup;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deleteGroup: number | null = null;
        try {
            deleteGroup = await Group.destroy({
                where: {
                    name: params.groupName
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deleteGroup;
    }
}

export default GroupDao;
