export namespace JoinRequestTypes {
    export interface JoinRequestPostBody {
        author: string;
        groupName: string;
    }
    export interface JoinRequestBody extends JoinRequestPostBody {
        id: number;
    }
}
