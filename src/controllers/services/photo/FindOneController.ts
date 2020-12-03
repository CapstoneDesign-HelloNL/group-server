import { NextFunction, Request, Response } from "express";
import Controller from "@src/controllers/Controller";
import PhotoService from "@src/services/photo/PhotoService";
import resTypes from "@src/utils/resTypes";
import Photo from "@src/models/photo/PhotoModel";

class FindOneController extends Controller {
    private result: Photo | string;
    constructor() {
        super();
        this.result = "";
    }
    protected async doService(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        this.result = await PhotoService.findOne(req);
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
                resTypes.cannotFindItemRes(res, "gallery photo");
                break;
            case "UnexpectedError":
                resTypes.unexpectedErrorRes(res);
                break;
            default:
                resTypes.successRes(res, "Find gallery photo", this.result);
        }
    }
}

export default FindOneController;
