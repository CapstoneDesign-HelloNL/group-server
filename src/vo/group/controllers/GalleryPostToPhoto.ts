export namespace GalleryPostToPhotoTypes {
    export interface GalleryPostToPhotoPostBody {
        galleryPostId: number;
        galleryPhotoId: number;
    }
    export interface GalleryPostToPhotoBody extends GalleryPostToPhotoPostBody {
        id: number;
    }
}
