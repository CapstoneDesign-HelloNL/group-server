export namespace GroupGalleryPostToPhotoTypes {
    export interface GroupGalleryPostToPhotoPostBody {
        galleryPostId: number;
        galleryPhotoId: number;
    }
    export interface GroupGalleryPostToPhotoBody
        extends GroupGalleryPostToPhotoPostBody {
        id: number;
    }
}
