import { Base } from "./base";
import { Information } from "./information";

export interface IGallery extends Base {
    id_galery: String;
    rating: number;
    information: Information;
    idInformation: string;
    image: string;
}