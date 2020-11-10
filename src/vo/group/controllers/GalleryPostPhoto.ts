export namespace GalleryPostPhotoTypes {
    export interface GalleryPostPhotoPostBody {
        galleryPostPhotoUrl: string;
    }
    export interface GalleryPostPhotoBody extends GalleryPostPhotoPostBody {
        id: number;
    }
}
