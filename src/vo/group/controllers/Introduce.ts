export namespace IntroduceTypes {
    export interface IntroducePostBody {
        content: string;
        groupName: string;
    }
    export interface IntroduceBody extends IntroducePostBody {
        id: number;
    }
}
