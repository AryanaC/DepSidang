import { Base } from "./base";
import { IGallery } from "./gallery";

export interface IComment extends Base {
    name: string;
    comment: string;
    rating: number;
    replyComment: string;
    tbGalery: IGallery;
    idGalery: string;
}