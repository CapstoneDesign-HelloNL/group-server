import { NextFunction, Request, Response } from "express";

import Group from "@src/models/group/GroupModel";
import Controller from "@src/controllers/Controller";
import GroupService from "@src/services/group/GroupService";
import resTypes from "@src/utils/resTypes";

class GroupFindByNameController extends Controller {
    private result: string | Group;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GroupService.findByName(req);
    }
    protected async doResolve(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        switch (this.result) {
            case "BadRequest":
                resTypes.badRequestErrorRes(res);
                break;
            case "InternalServerError":
                resTypes.internalErrorRes(res);
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            case "AlreadyExistGroup":
                resTypes.alreadyExistItemRes(res, "group");
                break;
            default:
                resTypes.successRes(res, "Create Group", this.result);
        }
    }
}

export default GroupFindByNameController;
