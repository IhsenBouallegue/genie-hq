import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL || "");
export const db = drizzle(client);

export const SCOOPSEARCH_URL = process.env.SCOOPSEARCH_URL;
export const SCOOPSEARCH_API_KEY = process.env.SCOOPSEARCH_API_KEY;
export const WINGET_API_URL = process.env.WINGET_API_URL;
export const HOMEBREW_FORMULA_API_URL = process.env.HOMEBREW_FORMULA_API_URL;
export const HOMEBREW_CASK_API_URL = process.env.HOMEBREW_CASK_API_URL;
