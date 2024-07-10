import { Base } from "./base";
import { IGallery } from "./gallery";

export interface IComment extends Base {
    name: string;
    comment: string;
    rating: number;
    reply_comment: string;
    status: string;
}

export type ValidateData = {
    is_valid: boolean;
  };

  export type ReplyData = {
    reply_comment: string;
  };
  