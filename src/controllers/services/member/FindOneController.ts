import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import MemberService from "@src/services/member/MemberService";
import resTypes from "@src/utils/resTypes";
import Member from "@src/models/member/MemberModel";

class FindOneController extends Controller {
    private result: Member | Member[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await MemberService.findOne(req);
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
                resTypes.cannotFindItemRes(res, "member");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find member", this.result);
        }
    }
}

export default FindOneController;
