import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import PostService from "@src/services/post/PostService";
import resTypes from "@src/utils/resTypes";

class UpdateController extends Controller {
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
        this.result = await PostService.delete(req);
        console.log(this.result);
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
            case "NoItemDeleted":
                resTypes.noItemDeletedRes(res, "post");
                break;
            default:
                resTypes.successRes(res, "Delete post");
        }
    }
}

export default UpdateController;
