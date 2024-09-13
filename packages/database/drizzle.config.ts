import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://postgres.vrguglpfvwdntzctmums:4n4Ws-r_6FSe-g$@aws-0-eu-central-1.pooler.supabase.com:6543/postgres",
  },
});
