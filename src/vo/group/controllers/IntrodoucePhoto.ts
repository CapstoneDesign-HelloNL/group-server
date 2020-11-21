export namespace IntroducePhotoTypes {
    export interface IntroducePhotoPostBody {
        url: string;
        introduceId: number;
    }
    export interface IntroducePhotoBody extends IntroducePhotoPostBody {
        id: number;
    }
}
