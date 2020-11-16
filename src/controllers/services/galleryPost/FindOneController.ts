import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryPostService from "@src/services/galleryPost/GalleryPostService";
import resTypes from "@src/utils/resTypes";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";

class FindOneController extends Controller {
    private result: GalleryPost | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GalleryPostService.findOne(req);
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
                resTypes.successRes(res, "Find gallery post", this.result);
        }
    }
}

export default FindOneController;
