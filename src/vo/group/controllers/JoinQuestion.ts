export namespace JoinQuestionTypes {
    export interface JoinQuestionPostBody {
        content: string;
        order: number;
        groupName: string;
    }
    export interface JoinQuestionBody extends JoinQuestionPostBody {
        id: number;
    }
}
