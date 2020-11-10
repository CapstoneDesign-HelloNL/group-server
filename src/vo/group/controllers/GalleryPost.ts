export namespace GalleryPostTypes {
    export interface GalleryPostPostBody {
        title: string;
        content: string;
        author: string;
        galleryName: string;
    }
    export interface GalleryPostBody extends GalleryPostPostBody {
        id: number;
    }
}
