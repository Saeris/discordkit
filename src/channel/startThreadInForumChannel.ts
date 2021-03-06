import { z } from "zod";
import { mutation, post } from "../utils";
import type { Channel } from "./types";
import { allowedMention, attachment, autoArchiveDuration, embed, MessageFlag } from "./types";

export const startThreadInForumChannelSchema = z.object({
  channel: z.string().min(1),
  body: z.object({
    /** 1-100 character channel name */
    name: z.string().min(1).max(100),
    /** duration in minutes to automatically archive the thread after recent activity, can be set to: 60, 1440, 4320, 10080 */
    autoArchiveDuration: autoArchiveDuration.optional(),
    /** amount of seconds a user has to wait before sending another message (0-21600) */
    rateLimitPerUser: z.number().min(0).max(21600),
    /** contents of the first message in the forum thread */
    message: z
      .object({
        /** Message contents (up to 2000 characters) */
        content: z.string().min(1).max(2000),
        /** Embedded rich content (up to 6000 characters) */
        embeds: z.array(embed),
        /** Allowed mentions for the message */
        allowedMentions: allowedMention,
        /** Components to include with the message */
        //components?	array of message component objects
        /** IDs of up to 3 stickers in the server to send in the message */
        stickerIds: z.array(z.string()).max(3),
        /** Contents of the file being sent. See Uploading Files */
        files: z.unknown(),
        /** JSON-encoded body of non-file params, only for multipart/form-data requests. See Uploading Files */
        payloadJson: z.unknown(),
        /** Attachment objects with filename and description. See Uploading Files */
        attachments: z.array(attachment.partial()),
        /** Message flags combined as a bitfield (only SUPPRESS_EMBEDS can be set) */
        flags: z.nativeEnum(MessageFlag)
      })
      .partial()
  })
});

/**
 * Creates a new thread in a forum channel, and sends a message within the created thread. Returns a channel, with a nested message object, on success, and a `400 BAD REQUEST` on invalid parameters. Fires a [Thread Create](https://discord.com/developers/docs/topics/gateway#thread-create) and [Message Create](https://discord.com/developers/docs/topics/gateway#message-create) Gateway event.
 *
 * - The type of the created thread is `GUILD_PUBLIC_THREAD`.
 * - See [message formatting](https://discord.com/developers/docs/reference#message-formatting) for more information on how to properly format messages.
 * - The current user must have the `SEND_MESSAGES` permission (`CREATE_PUBLIC_THREADS` is ignored).
 * - The maximum request size when sending a message is **8MiB**.
 * - For the embed object, you can set every field except `type` (it will be `rich` regardless of if you try to set it), `provider`, `video`, and any `height`, `width`, or `proxy_url` values for images.
 * - Examples for file uploads are available in [Uploading Files](https://discord.com/developers/docs/reference#uploading-files).
 * - Files must be attached using a `multipart/form-data` body as described in [Uploading Files](https://discord.com/developers/docs/reference#uploading-files).
 * - Note that when sending a message, you must provide a value for at **least one of** `content`, `embeds`, or `files[n]`.
 *
 * *Discord may strip certain characters from message content, like invalid unicode characters or characters which cause unexpected message formatting. If you are passing user-generated strings into message content, consider sanitizing the data to prevent unexpected behavior and utilizing `allowed_mentions` to prevent unexpected mentions.*
 *
 * *This endpoint supports the `X-Audit-Log-Reason` header.*
 *
 * https://discord.com/developers/docs/resources/channel#start-thread-in-forum-channel
 */
export const startThreadInForumChannel = mutation(startThreadInForumChannelSchema, async ({ channel, body }) =>
  post<Channel>(`/channels/${channel}/threads`, body)
);
