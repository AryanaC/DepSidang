import { Base } from "./base";
import { IInformation } from "./information";

export interface IGallery extends Base {
    id_galery: string;
    rating: number;
    information: IInformation;
    idInformation: string;
    id_information: string;
    image: string;
}