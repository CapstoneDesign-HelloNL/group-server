import { Request, Response, NextFunction } from "express";

import { GroupScheduleTypes } from "@src/vo/group/controllers/GroupSchedule";
import GroupSchedule from "@src/models/GroupScheduleModel";
import GroupScheduleDao from "@src/dao/GroupScheduleDao";

class GroupScheduleService {
    static async findAll(req: Request): Promise<GroupSchedule | string> {
        const groupBody: GroupScheduleTypes.GroupSchedulePostBody = req.body;
        if (!groupBody.content) return "BadRequest";
        const find = await GroupScheduleDao.getInstance().findAll(
            groupBody.content
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
        const groupAgedaBody: GroupScheduleTypes.GroupSchedulePostBody =
            req.body;
        if (!groupAgedaBody.content) return "BadRequest";

        const groupSchedule:
            | GroupSchedule
            | null
            | undefined = await GroupScheduleDao.getInstance().save(
            groupAgedaBody
        );
        switch (groupSchedule) {
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
        const groupScheduleBody: GroupScheduleTypes.GroupSchedulePostBody =
            req.body;
        if (!groupScheduleBody.content) return "BadRequest";

        const group:
            | any
            | null
            | undefined = await GroupScheduleDao.getInstance().update(
            groupScheduleBody
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
        const groupBody: GroupScheduleTypes.GroupSchedulePostBody = req.body;
        if (!groupBody.content) return "BadRequest";

        const group:
            | number
            | null
            | undefined = await GroupScheduleDao.getInstance().destroy(
            groupBody
        );
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

export default GroupScheduleService;
