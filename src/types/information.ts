import { Base } from "./base";

export interface Information extends Base {
    idLogin: number;
    judul_foto: string;
    nama_lokasi: string;
    deskripsi: string;
}