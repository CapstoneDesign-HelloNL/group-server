export namespace AgendaTypes {
    export interface AgendaPostBody {
        content: string;
        groupName: string;
    }
    export interface AgendaBody extends AgendaPostBody {
        id: number;
    }
}
