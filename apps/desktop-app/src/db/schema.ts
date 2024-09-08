import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  jsonb,
} from "drizzle-orm/pg-core";

// Applications Table
export const applicationsTable = pgTable("applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  notes: text("notes"), // Column for notes
  homepage: text("homepage"), // Column for homepage
  version: text("version"), // New column for version
  category: text("category"), // Example: Browser, Developer Tool, etc.
  tags: jsonb("tags"), // JSON array of tags
  images: jsonb("images"), // JSON array of image URLs
  iconUrl: text("icon_url"), // Path to the app’s icon
  repositoryStars: integer("repository_stars"), // Column for repository stars
  lastCommitDate: timestamp("last_commit_date"), // Column for the last commit date
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Installation Methods Table
export const installationMethodsTable = pgTable("installation_methods", {
  id: serial("id").primaryKey(),
  applicationId: integer("application_id")
    .notNull()
    .references(() => applicationsTable.id, { onDelete: "cascade" }),
  osId: integer("os_id")
    .notNull()
    .references(() => operatingSystemsTable.id, { onDelete: "cascade" }),
  packageManagerId: integer("package_manager_id")
    .notNull()
    .references(() => packageManagersTable.id, { onDelete: "cascade" }),
  command: text("command"), // New column for storing the complete installation command
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Operating Systems Table
export const operatingSystemsTable = pgTable("operating_systems", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Example: Windows, macOS, Linux
  version: text("version"), // Example: "10.0.19041", "Ubuntu 20.04"
  supportedPackageManagersIds: jsonb("supported_package_managers_ids"), // JSON array of supported package managers
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// Package Managers Table
export const packageManagersTable = pgTable("package_managers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Example: Scoop, Winget, Homebrew
  command: text("command"), // Installation command pattern, e.g., "winget install --id"
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

// TypeScript Types for Insertion and Selection
export type InsertApplication = typeof applicationsTable.$inferInsert;
export type SelectApplication = typeof applicationsTable.$inferSelect;

export type InsertIntallationMethod =
  typeof installationMethodsTable.$inferInsert;
export type SelectInstallationMethod =
  typeof installationMethodsTable.$inferSelect;

export type InsertOperatingSystem = typeof operatingSystemsTable.$inferInsert;
export type SelectOperatingSystem = typeof operatingSystemsTable.$inferSelect;

export type InsertPackageManager = typeof packageManagersTable.$inferInsert;
export type SelectPackageManager = typeof packageManagersTable.$inferSelect;
