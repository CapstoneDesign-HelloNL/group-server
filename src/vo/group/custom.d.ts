declare namespace Express {
    interface decoded {
        email?: string;
    }
    export interface Request {
        decoded?: decoded | any;
    }
}
