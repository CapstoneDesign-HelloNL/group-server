import { Request, Response, NextFunction } from "express";

import { GroupTypes } from "@src/vo/group/controllers/Group";
import Group from "@src/models/group/GroupModel";
import GroupDao from "@src/dao/group/GroupDao";
import { MemberTypes } from "@src/vo/group/controllers/Member";
import Member from "@src/models/member/MemberModel";

class GroupService {
    static async isAlreadyHaveGroup(req: Request): Promise<string> {
        const groupBody: GroupTypes.GroupBody = req.body;
        if (!groupBody.name || !groupBody.admin) return "BadRequest";
        const find = await GroupDao.getInstance().find(groupBody.name);
        switch (find) {
            case undefined:
                return "InternalServerError";
            default:
                if (find !== null) return "AlreadyExistGroup";
                else return "Success";
        }
    }

    static async findAll(req: Request): Promise<Group | string> {
        const groupBody: GroupTypes.GroupBody = req.body;
        if (!groupBody.name) return "BadRequest";
        const find = await GroupDao.getInstance().findAll(groupBody.name);
        switch (find) {
            case undefined:
                return "InternalServerError";
            case null:
                return "UnexpectedError";
            default:
                return find;
        }
    }

    static async findSignUp(req: Request): Promise<Member | string> {
        // const groupBody: GroupTypes.GroupBody = req.body;
        const memberBody: MemberTypes.MemberBody = req.body.decoded;
        // if (!groupBody.name) return "BadRequest";
        const find = await GroupDao.getInstance().findSignUp(memberBody.email);
        switch (find) {
            case undefined:
                return "InternalServerError";
            case null:
                return "UnexpectedError";
            default:
                return find;
        }
    }

    static async findByName(req: Request): Promise<Group | string> {
        const groupBody: GroupTypes.GroupBody = req.body;
        if (!groupBody.name) return "BadRequest";
        const find = await GroupDao.getInstance().findByName(
            req.body.decoded.email,
            groupBody.name
        );
        switch (find) {
            case undefined:
                return "InternalServerError";
            case null:
                return "UnexpectedError";
            default:
                return find;
        }
    }

    static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string> {
        const groupBody: GroupTypes.GroupBody = req.body;
        const memberBody: MemberTypes.MemberBody = req.body.decoded;
        if (!groupBody.name || !groupBody.admin) return "BadRequest";

        const group:
            | Group
            | null
            | undefined = await GroupDao.getInstance().save(
            memberBody,
            groupBody
        );
        switch (group) {
            case undefined:
                return "InternalServerError";
            case null:
                return "UnexpectedError";
            default:
                return "Success";
        }
    }

    static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string> {
        const groupBody: GroupTypes.GroupBody = req.body;
        if (!groupBody.name || !groupBody.admin) return "BadRequest";

        const group:
            | any
            | null
            | undefined = await GroupDao.getInstance().update(groupBody);
        switch (group) {
            case undefined:
                return "InternalServerError";
            case null:
                return "UnexpectedError";
            default:
                return "Success";
        }
    }

    static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<string> {
        const groupBody: GroupTypes.GroupBody = req.body;
        if (!groupBody.name || !groupBody.admin) return "BadRequest";

        const group:
            | number
            | null
            | undefined = await GroupDao.getInstance().destroy(groupBody);
        switch (group) {
            case undefined:
                return "InternalServerError";
            case null:
                return "UnexpectedError";
            case 0:
                return "NoItemDeleted";
            default:
                return "Success";
        }
    }
}

export default GroupService;
