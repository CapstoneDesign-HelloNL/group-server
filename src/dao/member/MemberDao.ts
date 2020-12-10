import GroupDBManager from "@src/models/GroupDBManager";
import Member from "@src/models/member/MemberModel";
import LogService from "@src/utils/LogService";
import Dao from "@src/dao/Dao";
import {
    AllStrictReqData,
    ParamsStrictReqData
} from "@src/vo/group/services/reqData";
import { ValidationError } from "sequelize";

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

    async findSignUp({
        decoded
    }: ParamsStrictReqData): Promise<Member[] | string | null | undefined> {
        let members: Member[] | null = null;
        try {
            members = await Member.findAll({
                where: {
                    memberEmail: decoded?.email
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return `BadRequest`;
            return undefined;
        }
        return members;
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
                    ...params
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
    }: AllStrictReqData): Promise<Member[] | string | null | undefined> {
        let members: Member[] | null = null;
        try {
            members = await Member.findAll({
                where: {
                    ...params
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return members;
    }

    async save({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<Member | string | null | undefined> {
        let newMember: Member | null = null;
        try {
            newMember = await Member.create({
                ...data,
                ...params,
                memberRank:
                    data.memberRank !== undefined ? data.memberRank : "일반회원"
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return newMember;
    }

    async update({
        data,
        decoded,
        params
    }: AllStrictReqData): Promise<unknown | null | undefined> {
        let updateMember: unknown | null = null;
        try {
            updateMember = await Member.update(
                { ...data },
                {
                    where: {
                        ...params
                    }
                }
            );
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
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
        try {
            deleteMember = await Member.destroy({
                where: {
                    ...params
                }
            });
        } catch (err) {
            logger.error(err);
            if (err instanceof ValidationError) return "BadRequest";
            return undefined;
        }
        return deleteMember; //1 is success, 0 or undefined are fail
    }
}

export default MemberDao;
