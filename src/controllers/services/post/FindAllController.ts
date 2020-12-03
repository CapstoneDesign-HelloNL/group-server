import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import PostService from "@src/services/post/PostService";
import resTypes from "@src/utils/resTypes";
import Post from "@src/models/post/PostModel";

class FindAllController extends Controller {
    private result: Post[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await PostService.findAll(req);
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
                resTypes.cannotFindItemRes(res, "post");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find all post", this.result);
        }
    }
}

export default FindAllController;
