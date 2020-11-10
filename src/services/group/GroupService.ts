import { Request, Response, NextFunction } from "express";
import { GroupTypes } from "@src/vo/group/controllers/Group";
import { MemberTypes } from "@src/vo/group/controllers/Member";
import Group from "@src/models/group/GroupModel";
import GroupDao from "@src/dao/group/GroupDao";
import Member from "@src/models/member/MemberModel";
import ReqData from "@src/vo/group/services/reqData";
import serviceFactory from "@src/vo/group/services/ServiceFactory";
import Dao from "@src/dao/Dao";

class GroupService {
    static async isAlreadyHaveGroup(req: Request): Promise<string> {
        const reqData: ReqData = {
            data: req.body.data,
            decoded: req.body.decoded,
            params: req.params
        };
        if (!reqData.data.name || !reqData.data.admin) return "BadRequest";
        const find = await GroupDao.getInstance().find(reqData);
        switch (find) {
            case undefined:
                return "InternalServerError";
            default:
                if (find !== null) return "AlreadyExistGroup";
                else return "Success";
        }
    }
    static findAll = serviceFactory(
        "findAll",
        GroupDao,
        GroupDao.getInstance().findAll
    );
    // static async findAll(req: Request): Promise<Group | string> {
    //     const reqData: ReqData = {
    //         data: req.body.data,
    //         decoded: req.body.decoded,
    //         params: req.params
    //     };
    //     if (!reqData.data.name) return "BadRequest";
    //     const find = await GroupDao.getInstance().findAll(reqData);
    //     switch (find) {
    //         case undefined:
    //             return "InternalServerError";
    //         case null:
    //             return "UnexpectedError";
    //         default:
    //             return find;
    //     }
    // }
    static findSignUp = serviceFactory(
        "findAll",
        GroupDao,
        GroupDao.getInstance().findSignUp
    );
    // static async findSignUp(req: Request): Promise<Member | string> {
    //     const reqData: ReqData = {
    //         data: req.body.data,
    //         decoded: req.body.decoded,
    //         params: req.params
    //     };
    //     const find = await GroupDao.getInstance().findSignUp(reqData);
    //     switch (find) {
    //         case undefined:
    //             return "InternalServerError";
    //         case null:
    //             return "UnexpectedError";
    //         default:
    //             return find;
    //     }
    // }

    static findByName = serviceFactory(
        "findByName",
        GroupDao,
        GroupDao.getInstance().findByName
    );
    // static async findByName(req: Request): Promise<Group | string> {
    //     const reqData: ReqData = {
    //         data: req.body.data,
    //         decoded: req.body.decoded,
    //         params: req.params
    //     };
    //     if (!reqData.data.name) return "BadRequest";
    //     const find = await GroupDao.getInstance().findByName(reqData);
    //     switch (find) {
    //         case undefined:
    //             return "InternalServerError";
    //         case null:
    //             return "UnexpectedError";
    //         default:
    //             return find;
    //     }
    // }

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
        if (!reqData.data.name || !reqData.data.admin) return "BadRequest";
        const group:
            | Group
            | null
            | undefined = await GroupDao.getInstance().save(reqData);
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
        const reqData: ReqData = {
            data: req.body.data,
            decoded: req.body.decoded,
            params: req.params
        };
        if (!reqData.data.name || !reqData.data.admin) return "BadRequest";

        const group:
            | any
            | null
            | undefined = await GroupDao.getInstance().update(reqData);
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
        if (!reqData.data.name || !reqData.data.admin) return "BadRequest";

        const group:
            | number
            | null
            | undefined = await GroupDao.getInstance().destroy(reqData);
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
