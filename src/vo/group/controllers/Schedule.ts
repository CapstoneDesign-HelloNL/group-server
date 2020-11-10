export namespace ScheduleTypes {
    export interface SchedulePostBody {
        title: string;
        content: string;
        author: string;
        startDate: Date;
        endDate: Date;
        groupName: string;
    }
    export interface ScheduleBody extends SchedulePostBody {
        id: number;
    }
}
