export namespace NoticeTypes {
    export interface NoticePostBody {
        title: string;
        content: string;
        author: string;
        photo: string;
        groupName: string;
    }
    export interface NoticeBody extends NoticePostBody {
        id: number;
    }
}
