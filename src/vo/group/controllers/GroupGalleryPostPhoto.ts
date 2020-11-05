export namespace GroupGalleryPostPhotoTypes {
    export interface GroupGalleryPostPhotoPostBody {
        galleryPostPhotoUrl: string;
        galleryPostId: number;
    }
    export interface GroupGalleryPostPhotoBody
        extends GroupGalleryPostPhotoPostBody {
        id: number;
    }
}
