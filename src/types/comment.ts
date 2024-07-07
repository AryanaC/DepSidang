import { Base } from "./base";
import { Gallery } from "./gallery";

export interface Comment extends Base {
    name: string;
    comment: string;
    rating: number;
    replyComment: string;
    tbGalery: Gallery;
    idGalery: string;
}