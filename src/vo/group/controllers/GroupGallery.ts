export namespace GroupGalleryTypes {
    export interface GroupGalleryPostBody {
        title: string;
        groupId: number;
    }
    export interface GroupGalleryBody extends GroupGalleryPostBody {
        id: number;
    }
}
