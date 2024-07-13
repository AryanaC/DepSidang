import { Base } from "./base";
import { IInformation } from "./information";

export interface Monument extends Base {
    information: IInformation;
    idInformation: string;
    image: string;
}