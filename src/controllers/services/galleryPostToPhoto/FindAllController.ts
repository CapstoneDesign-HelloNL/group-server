import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import GalleryPostToPhotoService from "@src/services/galleryPostToPhoto/GalleryPostToPhotoService";
import resTypes from "@src/utils/resTypes";
import GalleryPostToPhoto from "@src/models/galleryPostToPhoto/GalleryPostToPhotoModel";

class FindAllController extends Controller {
    private result: GalleryPostToPhoto[] | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await GalleryPostToPhotoService.findAll(req);
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
                resTypes.successRes(
                    res,
                    "Find all gallery postToPhoto",
                    this.result
                );
        }
    }
}

export default FindAllController;
