export namespace GroupToMemberTypes {
    export interface GroupToMemberPostBody {
        groupName: string;
        memberEmail: string;
        memberRank: string;
    }
    export interface GroupToMemberBody extends GroupToMemberPostBody {
        id: number;
    }
}
