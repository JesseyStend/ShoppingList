import { z } from "zod";

export const zUnits = z.enum(["g", "ml", "Units"]);
export type Units = z.infer<typeof zUnits>;
