import { z } from "zod";
import { mutation, put } from "../utils";

export const editChannelPermissionsSchema = z.object({
  channel: z.string().min(1),
  overwrite: z.string().min(1),
  body: z.object({
    /** the bitwise value of all allowed permissions (default "0") */
    allow: z.string().optional(),
    /** the bitwise value of all disallowed permissions (default "0") */
    deny: z.string().optional(),
    /** 0 for a role or 1 for a member */
    type: z.union([z.literal(0), z.literal(1)])
  })
});

/**
 * Edit the channel permission overwrites for a user or role in a channel. Only usable for guild channels. Requires the `MANAGE_ROLES` permission. Only permissions your bot has in the guild or parent channel (if applicable) can be allowed/denied (unless your bot has a `MANAGE_ROLES` overwrite in the channel). Returns a 204 empty response on success. For more information about permissions, see [permissions](https://discord.com/developers/docs/topics/permissions#permissions).
 *
 * *This endpoint supports the `X-Audit-Log-Reason` header.*
 *
 * https://discord.com/developers/docs/resources/channel#edit-channel-permissions
 */
export const editChannelPermissions = mutation(editChannelPermissionsSchema, async ({ channel, overwrite, body }) =>
  put(`/channels/${channel}/permissions/${overwrite}`, body)
);
