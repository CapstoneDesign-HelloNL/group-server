export namespace GalleryPhotoTypes {
    export interface GalleryPhotoPostBody {
        galleryPhotoUrl: string;
        postId: string;
    }
    export interface GalleryPhotoBody extends GalleryPhotoPostBody {
        id: number;
    }
}
