import { Request } from "express";
import { ReqData } from "@src/vo/group/services/reqData";

const serviceReturn = {
    get: async <T>(
        reqData: ReqData,
        daoFunc: Function
    ): Promise<T | string> => {
        try {
            const result = await daoFunc(reqData);
            switch (result) {
                case "BadRequest":
                    return "BadRequest";
                case undefined:
                    return "InternalServerError";
                case null:
                    return "CannotFindItem";
                // return "UnexpectedError";
                default:
                    return result;
            }
        } catch (e) {
            console.log(e);
            return "InternalServerError";
        }
    },
    postOrUpdate: async <T>(
        reqData: ReqData,
        daoFunc: Function
    ): Promise<string> => {
        try {
            const result = await daoFunc(reqData);
            switch (result) {
                case "BadRequest":
                    return "BadRequest";
                case undefined:
                    return "InternalServerError";
                case null:
                    return "UnexpectedError";
                case "AlreadyExistItem":
                    return `AlreadyExistItem`;
                default:
                    return "Success";
            }
        } catch (e) {
            console.log(e);
            return "InternalServerError";
        }
    },
    delete: async <T>(reqData: ReqData, daoFunc: Function): Promise<string> => {
        try {
            const result = await daoFunc(reqData);
            switch (result) {
                case "BadRequest":
                    return "BadRequest";
                case undefined:
                    return "InternalServerError";
                case null:
                    return "UnexpectedError";
                case 0:
                    return "NoItemDeleted";
                default:
                    return "Success";
            }
        } catch (e) {
            console.log(e);
            return "InternalServerError";
        }
    }
};
const serviceFactory = {
    get: <T>(daoFunc: Function) => {
        const func = async (req: Request): Promise<T | string> => {
            const reqData: ReqData = {
                data: req.body.data,
                decoded: req.body.decoded,
                params: req.params
            };
            //if -> return "BadRequest"
            const result: T | string = await serviceReturn.get<T>(
                reqData,
                daoFunc
            );
            return result;
        };
        return func;
    },

    postOrUpdate: <T>(daoFunc: Function) => {
        const func = async (req: Request): Promise<string> => {
            const reqData: ReqData = {
                data: req.body.data,
                decoded: req.body.decoded,
                params: req.params
            };
            //if -> return "BadRequest"
            const result: string = await serviceReturn.postOrUpdate<T>(
                reqData,
                daoFunc
            );
            return result;
        };
        return func;
    },
    delete: <T>(daoFunc: Function) => {
        const func = async (req: Request): Promise<string> => {
            const reqData: ReqData = {
                data: req.body.data,
                decoded: req.body.decoded,
                params: req.params
            };
            //if -> return "BadRequest"
            const result: string = await serviceReturn.delete<T>(
                reqData,
                daoFunc
            );
            return result;
        };
        return func;
    }
};

export default serviceFactory;
