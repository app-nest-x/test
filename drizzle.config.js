import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.jsx",
    out: "./drizzle",
   driver: "pglite",
  dbCredentials: {
  url:'process.env.NEXT_PUBLIC_DATABASE_URL',
  },
});
