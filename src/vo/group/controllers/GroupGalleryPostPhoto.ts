export namespace GroupGalleryPostPhotoTypes {
    export interface GroupGalleryPostPhotoPostBody {
        galleryPostPhotoUrl: string;
    }
    export interface GroupGalleryPostPhotoBody
        extends GroupGalleryPostPhotoPostBody {
        id: number;
    }
}
