export namespace GroupScheduleTypes {
    export interface GroupSchedulePostBody {
        title: string;
        content: string;
        author: string;
        groupId: number;
    }
    export interface GroupScheduleBody extends GroupSchedulePostBody {
        id: number;
    }
}
