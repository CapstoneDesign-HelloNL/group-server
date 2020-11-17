import { NextFunction, Request, Response } from "express";

import Member from "@src/models/member/MemberModel";
import Controller from "@src/controllers/Controller";
import MemberService from "@src/services/member/MemberService";
import resTypes from "@src/utils/resTypes";

class FindAllController extends Controller {
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
        this.result = await MemberService.findAll(req);
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
                resTypes.successRes(res, "Find All member", this.result);
        }
    }
}

export default FindAllController;
