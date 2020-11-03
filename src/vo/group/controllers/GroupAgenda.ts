export namespace GroupAgendaTypes {
    export interface GroupAgendaPostBody {
        content: string;
        groupId: number;
    }
    export interface GroupAgendaBody extends GroupAgendaPostBody {
        id: number;
    }
}
