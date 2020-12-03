export namespace PhotoTypes {
    export interface PhotoPostBody {
        photoUrl: string;
        postId: string;
    }
    export interface PhotoBody extends PhotoPostBody {
        id: number;
    }
}
