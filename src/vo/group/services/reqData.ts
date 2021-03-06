interface data {
    [attr: string]: any;
}
interface decoded {
    email: string;
}
interface params {
    [attr: string]: any;
}
interface files {
    [attr: string]: any;
}
interface file {}

export interface ReqData {
    data?: data;
    decoded?: decoded;
    params?: params;
    files?: files;
}

export interface ParamsStrictReqData extends ReqData {
    params: params;
}
export interface StrictReqData extends ReqData {
    data: data;
    decoded: decoded;
}
export interface AllStrictReqData extends StrictReqData {
    params: params;
    files?: files;
}
