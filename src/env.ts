import { z } from "zod";

const Env = z.object({
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),
  JWT_SECRET: z.string(),
});

export const env = Env.parse(process.env);
