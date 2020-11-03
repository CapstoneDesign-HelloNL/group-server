import { Request, Response, NextFunction } from "express";

import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
import Group from "@src/models/GroupModel";
import GroupDao from "@src/dao/GroupDao";

class GroupAgendaService {
    static async findAll(req: Request): Promise<Group | string> {
        const groupBody: GroupAgendaTypes.GroupAgendaPostBody = req.body;
        if (!groupBody.content) return "BadRequest";
        const find = await GroupDao.getInstance().findAll(groupBody.content);
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
        const groupAgedaBody: GroupAgendaTypes.GroupAgendaPostBody = req.body;
        if (!groupAgedaBody.content) return "BadRequest";

        const groupAgenda:
            | Group
            | null
            | undefined = await GroupDao.getInstance().save(groupAgedaBody);
        switch (groupAgenda) {
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
        const groupAgendaBody: GroupAgendaTypes.GroupAgendaPostBody = req.body;
        if (!groupAgendaBody.content) return "BadRequest";

        const group:
            | any
            | null
            | undefined = await GroupDao.getInstance().update(groupAgendaBody);
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
        const groupBody: GroupAgendaTypes.GroupAgendaPostBody = req.body;
        if (!groupBody.content) return "BadRequest";

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

export default GroupAgendaService;
