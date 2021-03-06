import { z } from "zod";
import { mutation, remove } from "../utils";

export const deleteGuildScheduledEventSchema = z.object({
  guild: z.string().min(1),
  event: z.string().min(1)
});

/**
 * Delete a guild scheduled event. Returns a `204` on success.
 *
 * https://discord.com/developers/docs/resources/guild-scheduled-event#delete-guild-scheduled-event
 */
export const deleteGuildScheduledEvent = mutation(deleteGuildScheduledEventSchema, async ({ guild, event }) =>
  remove(`/guilds/${guild}/scheduled-events/${event}`)
);
