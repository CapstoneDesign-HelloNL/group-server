import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import NoticeService from "@src/services/notice/NoticeService";
import resTypes from "@src/utils/resTypes";
import Notice from "@src/models/notice/NoticeModel";

class FindAllController extends Controller {
    private result: Notice[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await NoticeService.findAll(req);
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
            default:
                resTypes.successRes(res, "Find all notice", this.result);
        }
    }
}

export default FindAllController;
