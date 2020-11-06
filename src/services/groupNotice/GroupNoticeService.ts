import { Request, Response, NextFunction } from "express";

import { GroupNoticeTypes } from "@src/vo/group/controllers/GroupNotice";
import GroupNotice from "@src/models/GroupNoticeModel";
import GroupNoticeDao from "@src/dao/GroupNoticeDao";

class GroupNoticeService {
    static async findAll(req: Request): Promise<GroupNotice | string> {
        const groupBody: GroupNoticeTypes.GroupNoticePostBody = req.body;
        if (!groupBody.content) return "BadRequest";
        const find = await GroupNoticeDao.getInstance().findAll(
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
        const groupAgedaBody: GroupNoticeTypes.GroupNoticePostBody = req.body;
        if (!groupAgedaBody.content) return "BadRequest";

        const groupNotice:
            | GroupNotice
            | null
            | undefined = await GroupNoticeDao.getInstance().save(
            groupAgedaBody
        );
        switch (groupNotice) {
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
        const groupNoticeBody: GroupNoticeTypes.GroupNoticePostBody = req.body;
        if (!groupNoticeBody.content) return "BadRequest";

        const group:
            | any
            | null
            | undefined = await GroupNoticeDao.getInstance().update(
            groupNoticeBody
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
        const groupBody: GroupNoticeTypes.GroupNoticePostBody = req.body;
        if (!groupBody.content) return "BadRequest";

        const group:
            | number
            | null
            | undefined = await GroupNoticeDao.getInstance().destroy(groupBody);
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

export default GroupNoticeService;
