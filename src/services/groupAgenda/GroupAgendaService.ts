import { Request, Response, NextFunction } from "express";

import { GroupAgendaTypes } from "@src/vo/group/controllers/GroupAgenda";
import GroupAgenda from "@src/models/groupAgenda/GroupAgendaModel";
import GroupAgendaDao from "@src/dao/groupAgenda/GroupAgendaDao";
import ReqData from "@src/vo/group/services/reqData";

class GroupAgendaService {
    static async findAllByName(req: Request): Promise<GroupAgenda[] | string> {
        const reqData: ReqData = {
            data: req.body.data,
            decoded: req.body.decoded,
            params: req.params
        };
        if (!reqData.params.groupName) return "BadRequest";
        const find = await GroupAgendaDao.getInstance().findAll(reqData);
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
        const reqData: ReqData = {
            data: req.body.data,
            decoded: req.body.decoded,
            params: req.params
        };
        if (!reqData.data.content) return "BadRequest";

        const groupAgenda:
            | GroupAgenda
            | null
            | undefined = await GroupAgendaDao.getInstance().save(reqData);
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
        const reqData: ReqData = {
            data: req.body.data,
            decoded: req.body.decoded,
            params: req.params
        };
        if (!reqData.data.content) return "BadRequest";

        const group:
            | any
            | null
            | undefined = await GroupAgendaDao.getInstance().update(reqData);
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
        const reqData: ReqData = {
            data: req.body.data,
            decoded: req.body.decoded,
            params: req.params
        };
        if (!reqData.data.content) return "BadRequest";

        const group:
            | number
            | null
            | undefined = await GroupAgendaDao.getInstance().destroy(reqData);
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
