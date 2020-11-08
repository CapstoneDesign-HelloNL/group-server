export namespace GroupAgendaTypes {
    export interface GroupAgendaPostBody {
        content: string;
        groupName: string;
    }
    export interface GroupAgendaBody extends GroupAgendaPostBody {
        id: number;
    }
}
