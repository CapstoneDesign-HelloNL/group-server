export namespace GroupTypes {
    export interface GroupPostBody {
        name: string;
        admin: string;
        advisor: string;
    }
    export interface GroupBody extends GroupPostBody {
        id: number;
    }
}
