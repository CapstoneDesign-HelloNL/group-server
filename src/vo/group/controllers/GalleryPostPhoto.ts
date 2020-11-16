export namespace GalleryPhotoTypes {
    export interface GalleryPhotoPostBody {
        galleryPhotoUrl: string;
    }
    export interface GalleryPhotoBody extends GalleryPhotoPostBody {
        id: number;
    }
}
