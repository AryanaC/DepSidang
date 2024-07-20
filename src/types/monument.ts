import { Base } from "./base";
import { IInformation } from "./information";

export interface IMonument extends Base {
    judul_foto: string;
    nama_lokasi: string;
    deskripsi: string;
    image: string;
}