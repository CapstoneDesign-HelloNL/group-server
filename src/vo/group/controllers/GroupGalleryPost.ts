export namespace GroupGalleryPostTypes {
    export interface GroupGalleryPostPostBody {
        title: string;
        content: string;
        author: string;
        galleryId: number;
    }
    export interface GroupGalleryPostBody extends GroupGalleryPostPostBody {
        id: number;
    }
}