import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GroupToMemberService from "@src/services/groupToMember/GroupToMemberService";
import resTypes from "@src/utils/resTypes";
import GroupToMember from "@src/models/groupToMember/GroupToMemberModel";

class FindOneController extends Controller {
    private result: GroupToMember | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GroupToMemberService.findOne(req);
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
                resTypes.cannotFindItemRes(res, "schedule");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find schedule", this.result);
        }
    }
}

export default FindOneController;