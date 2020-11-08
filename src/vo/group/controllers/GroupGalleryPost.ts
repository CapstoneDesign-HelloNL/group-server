export namespace GroupGalleryPostTypes {
    export interface GroupGalleryPostPostBody {
        title: string;
        content: string;
        author: string;
        galleryName: string;
    }
    export interface GroupGalleryPostBody extends GroupGalleryPostPostBody {
        id: number;
    }
}
