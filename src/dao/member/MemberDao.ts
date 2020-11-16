import { Op, UniqueConstraintError, ValidationError } from "sequelize";
import GroupDBManager from "@src/models/GroupDBManager";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import Member from "@src/models/member/MemberModel";
import Group from "@src/models/group/GroupModel";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";

const logger = LogService.getInstance();
class MemberDao extends Dao {
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
    }: AllStrictReqData): Promise<Member | string | null | undefined> {
        let member: Member | null = null;
        try {
            member = await Member.findOne({
                where: {
                    email: params.email
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return member;
    }

    async findAll({
        data,
        decoded,
        params
    }: ParamsStrictReqData): Promise<Member[] | string | null | undefined> {
        let member: Member[] | null = null;
        try {
            member = await Member.findAll({
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
        return member;
    }

    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Member | string | undefined> {
        const transaction = await this.db?.getConnection().transaction();
        let newMember: Member | null = null;
        let group: Group | null = null;

        try {
            newMember = await Member.create({ ...data }, { transaction });
            group = await Group.findByPk(params.groupName, { transaction });

            if (group == null) throw Error;

            await newMember.addMemberToGroup(group, { transaction });
            await group.addMember(newMember, { transaction });
        } catch (err) {
            logger.error(err);
            if (err instanceof UniqueConstraintError) return `AlreadyExistItem`;
            else if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return newMember;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<any | null | undefined> {
        let updateMember: any | null = null;
        try {
            updateMember = await Member.update(
                { ...data },
                { where: { email: params.memberEmail } }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return updateMember;
    }

    async delete({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<number | string | null | undefined> {
        let deleteMember: number | null = null;
        //Add Kafka connection to Auth server because of deleting member
        try {
            deleteMember = await Member.destroy({
                where: {
                    email: params.memberEmail
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return deleteMember; //1 is success, 0 or undefined are fail
    }
}

export default MemberDao;
