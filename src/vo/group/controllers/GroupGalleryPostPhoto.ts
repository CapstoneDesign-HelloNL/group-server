export namespace GroupGalleryPostPhotoTypes {
    export interface GroupGalleryPostPhotoPostBody {
        galleryPostUrl: string;
        galleryPostId: number;
    }
    export interface GroupGaleryPostPhotoBody
        extends GroupGalleryPostPhotoPostBody {
        id: number;
    }
}
