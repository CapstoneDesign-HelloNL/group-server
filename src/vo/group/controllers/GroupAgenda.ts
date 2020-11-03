export namespace GroupAgendaTypes {
    export interface GroupAgendaPostBody {
        content: string;
    }
    export interface GroupAgendaBody extends GroupAgendaPostBody {
        id: number;
    }
}
