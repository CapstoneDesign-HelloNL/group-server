import {
    Model,
    Sequelize,
    Optional,
    Association,
    BelongsToGetAssociationMixin,
    BelongsToCreateAssociationMixin,
    BelongsToSetAssociationMixin
} from "sequelize";
import { IntroducePhotoModelTypes } from "@src/vo/group/models/IntroducePhotoModel";
import { IntroducePhotoTypes } from "@src/vo/group/controllers/IntroducePhoto";
import Introduce from "@src/models/introduce/IntroduceModel";

interface IntroducePhotoCreationAttributes
    extends Optional<IntroducePhotoTypes.IntroducePhotoBody, "id"> {}
class IntroducePhoto
    extends Model
    // extends Model<
    //     GroupNoticeTypes.GroupNoticeBody,
    //     GroupNoticeCreationAttributes
    // >
    implements IntroducePhotoTypes.IntroducePhotoBody {
    public id!: number;
    public url!: string;
    public introduceId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getIntroduces!: BelongsToGetAssociationMixin<Introduce>; // Note the null assertions!
    public createIntroduce!: BelongsToCreateAssociationMixin<Introduce>;
    public setIntroduce!: BelongsToSetAssociationMixin<
        Introduce,
        "introduceId"
    >;
    public static associations: {
        introducePhotoToIntroduces: Association<IntroducePhoto, Introduce>;
    };

    static initiate(connection: Sequelize): Model {
        const opt: IntroducePhotoModelTypes.IBaseIntroducePhotoTableOptions = {
            sequelize: connection,
            tableName: "IntroducePhoto"
        };
        return IntroducePhoto.init(IntroducePhotoModelTypes.attr, opt);
    }
}
export default IntroducePhoto;
