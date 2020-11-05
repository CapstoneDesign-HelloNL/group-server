export namespace GroupScheduleTypes {
    export interface GroupSchedulePostBody {
        title: string;
        content: string;
        author: string;
        startDate: Date;
        endDate: Date;
        groupId: number;
    }
    export interface GroupScheduleBody extends GroupSchedulePostBody {
        id: number;
    }
}
