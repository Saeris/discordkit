import { z } from "zod";
import { mutation, remove } from "../utils";

export const deleteInviteSchema = z.object({
  code: z.string().min(1)
});

/**
 * Delete an invite. Requires the `MANAGE_CHANNELS` permission on the channel this invite belongs to, or `MANAGE_GUILD` to remove any invite across the guild. Returns an invite object on success. Fires a [Invite Delete](https://discord.com/developers/docs/topics/gateway#invite-delete) Gateway event.
 *
 * *This endpoint supports the `X-Audit-Log-Reason` header.*
 */
export const deleteInvite = mutation(deleteInviteSchema, async ({ code }) => remove(`/invites/${code}`));
