import { z } from "zod";

export const replySchema = z.object({
  reply_comment: z
    .string()
    .min(10, "Reply comment must be at least 10 characters long"),
});
