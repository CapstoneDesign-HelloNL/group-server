export namespace GroupNoticeTypes {
    export interface GroupNoticePostBody {
        title: string;
        content: string;
        author: string;
        photo: string;
        groupName: string;
    }
    export interface GroupNoticeBody extends GroupNoticePostBody {
        id: number;
    }
}
