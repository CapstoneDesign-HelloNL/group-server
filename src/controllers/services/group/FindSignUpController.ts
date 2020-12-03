import { NextFunction, Request, Response } from "express";

import Controller from "@src/controllers/Controller";
import GroupService from "@src/services/group/GroupService";
import resTypes from "@src/utils/resTypes";
import Member from "@src/models/member/MemberModel";
// import Member from "@src/models/member/MemberModel";

class FindByNameController extends Controller {
    private result: string | Member;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GroupService.findSignUp(req);
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
            case "CannotFindItem":
                resTypes.cannotFindItemRes(res, "group");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find SignUp Groups", this.result);
        }
    }
}

export default FindByNameController;
