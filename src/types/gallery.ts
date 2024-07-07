import { Base } from "./base";
import { Information } from "./information";

export interface IGallery extends Base {
    information: Information;
    idInformation: string;
    image: string;
}