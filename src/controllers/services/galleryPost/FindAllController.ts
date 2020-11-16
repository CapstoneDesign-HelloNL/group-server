import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryPostService from "@src/services/galleryPost/GalleryPostService";
import resTypes from "@src/utils/resTypes";
import GalleryPost from "@src/models/galleryPost/GalleryPostModel";

class FindAllController extends Controller {
    private result: GalleryPost[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GalleryPostService.findAll(req);
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
                resTypes.successRes(res, "Find all gallery post", this.result);
        }
    }
}

export default FindAllController;
