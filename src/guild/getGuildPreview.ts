import { z } from "zod";
import { get, query } from "../utils";
import type { Guild } from "./types";

export const getGuildPreviewSchema = z.object({
  guild: z.string().min(1)
});

/**
 * Returns the guild preview object for the given id. If the user is not in the guild, then the guild must be lurkable.
 *
 * https://discord.com/developers/docs/resources/guild#get-guild-preview
 */
export const getGuildPreview = query(getGuildPreviewSchema, ({ guild }) => get<Guild>(`/guilds/${guild}/preview`));
