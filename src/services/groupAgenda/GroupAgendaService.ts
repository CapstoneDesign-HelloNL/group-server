import { Request, Response, NextFunction } from "express";

import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import GroupAgendaDao from "@src/dao/groupAgenda/GroupAgendaDao";

class GroupAgendaService {
    static async findAllByName(req: Request): Promise<GroupAgenda[] | string> {
        const groupName = req.params.groupName;
        if (!groupName) return "BadRequest";
        const find = await GroupAgendaDao.getInstance().findAll(groupName);
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
            | GroupAgenda
            | null
            | undefined = await GroupAgendaDao.getInstance().save(
            groupAgedaBody
        );
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
            | undefined = await GroupAgendaDao.getInstance().update(
            groupAgendaBody
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
            | undefined = await GroupAgendaDao.getInstance().destroy(groupBody);
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
