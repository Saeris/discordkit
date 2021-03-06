import { z } from "zod";
import { mutation, remove } from "../utils";

export const deleteOwnReactionSchema = z.object({
  channel: z.string().min(1),
  message: z.string().min(1),
  emoji: z.string().min(1)
});

/**
 * Delete a reaction the current user has made for the message. Returns a 204 empty response on success. The emoji must be [URL Encoded](https://en.wikipedia.org/wiki/Percent-encoding) or the request will fail with `10014: Unknown Emoji`. To use custom emoji, you must encode it in the format `name:id` with the emoji name and emoji id.
 *
 * https://discord.com/developers/docs/resources/channel#delete-own-reaction
 */
export const deleteOwnReaction = mutation(deleteOwnReactionSchema, async ({ channel, message, emoji }) =>
  remove(`/channels/${channel}/messages/${message}/reactions/${emoji}/@me`)
);
