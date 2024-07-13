import { Base } from "./base";
import { IGallery } from "./gallery";

export interface IComment extends Base {
    name: string;
    comment: string;
    rating: number;
    reply: string;
    status: string;
    galery: {
      idgalery: string;
      judulfoto: string;
      namalokasi: string;
    }
}

export type ValidateData = {
    is_valid: boolean;
  };

  export type ReplyData = {
    reply_comment: string;
  };
  