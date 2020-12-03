export namespace PostTypes {
    export interface PostPostBody {
        title: string;
        content: string;
        author: string;
        galleryName: string;
        groupName: string;
    }
    export interface PostBody extends PostPostBody {
        id: number;
    }
}
