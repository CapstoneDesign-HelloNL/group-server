export namespace GroupToMemberTypes {
    export interface GroupToMemberPostBody {
        groupId: number;
        memberId: number;
        memberRank: string;
    }
    export interface GroupToMemberBody extends GroupToMemberPostBody {
        id: number;
    }
}
