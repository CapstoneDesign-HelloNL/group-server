import { Request } from "express";
import Group from "@src/models/group/GroupModel";
import Member from "@src/models/member/MemberModel";
import GroupDao from "@src/dao/group/GroupDao";
import ReqData from "@src/vo/group/services/reqData";
import serviceFactory from "@src/vo/group/services/ServiceFactory";

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
    static findAll = serviceFactory.get<Group>(GroupDao.getInstance().findAll);
    static findSignUp = serviceFactory.get<Member>(
        GroupDao.getInstance().findSignUp
    );
    static findByName = serviceFactory.get<Group>(
        GroupDao.getInstance().findByName
    );

    static create = serviceFactory.postOrUpdate<Group>(
        GroupDao.getInstance().save
    );

    static update = serviceFactory.postOrUpdate<Group>(
        GroupDao.getInstance().update
    );
    static delete = serviceFactory.delete<Group>(GroupDao.getInstance().delete);
    // static async create(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<string> {
    //     const reqData: ReqData = {
    //         data: req.body.data,
    //         decoded: req.body.decoded,
    //         params: req.params
    //     };
    //     if (!reqData.data.name || !reqData.data.admin) return "BadRequest";
    //     const group:
    //         | Group
    //         | null
    //         | undefined = await GroupDao.getInstance().save(reqData);
    //     switch (group) {
    //         case undefined:
    //             return "InternalServerError";
    //         case null:
    //             return "UnexpectedError";
    //         default:
    //             return "Success";
    //     }
    // }

    // static async update(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<string> {
    //     const reqData: ReqData = {
    //         data: req.body.data,
    //         decoded: req.body.decoded,
    //         params: req.params
    //     };
    //     if (!reqData.data.name || !reqData.data.admin) return "BadRequest";

    //     const group:
    //         | any
    //         | null
    //         | undefined = await GroupDao.getInstance().update(reqData);
    //     switch (group) {
    //         case undefined:
    //             return "InternalServerError";
    //         case null:
    //             return "UnexpectedError";
    //         default:
    //             return "Success";
    //     }
    // }

    // static async delete(
    //     req: Request,
    //     res: Response,
    //     next: NextFunction
    // ): Promise<string> {
    //     const reqData: ReqData = {
    //         data: req.body.data,
    //         decoded: req.body.decoded,
    //         params: req.params
    //     };
    //     if (!reqData.data.name || !reqData.data.admin) return "BadRequest";

    //     const group:
    //         | number
    //         | null
    //         | undefined = await GroupDao.getInstance().destroy(reqData);
    //     switch (group) {
    //         case undefined:
    //             return "InternalServerError";
    //         case null:
    //             return "UnexpectedError";
    //         case 0:
    //             return "NoItemDeleted";
    //         default:
    //             return "Success";
    //     }
    // }
}

export default GroupService;
