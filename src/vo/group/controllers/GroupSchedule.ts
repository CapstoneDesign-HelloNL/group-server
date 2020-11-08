export namespace GroupScheduleTypes {
    export interface GroupSchedulePostBody {
        title: string;
        content: string;
        author: string;
        startDate: Date;
        endDate: Date;
        groupName: string;
    }
    export interface GroupScheduleBody extends GroupSchedulePostBody {
        id: number;
    }
}
