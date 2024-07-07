import { Base } from "./base";
import { Information } from "./information";

export interface Monument extends Base {
    information: Information;
    idInformation: string;
    image: string;
}