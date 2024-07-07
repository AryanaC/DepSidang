import { Base } from "./base";
import { Information } from "./information";

export interface IGallery extends Base {
    tbInformation: Information;
    idInformation: string;
    image: string;
}