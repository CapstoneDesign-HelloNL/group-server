import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";
import GroupService from "@src/services/group/GroupService";
import resTypes from "@src/utils/resTypes";

class CheckAlreadyExistGroupController extends Controller {
    private result: string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        // this.result = await GroupService.isAlreadyHaveGroup(req);
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
            case "AlreadyExistItem":
                resTypes.alreadyExistItemRes(res, "group");
                break;
            default:
                next();
        }
    }
}

export default CheckAlreadyExistGroupController;
