export namespace MemberTypes {
    export interface MemberPostBody {
        memberId: number;
    }
    export interface MemberBody extends MemberPostBody {
        id: number;
    }
}
