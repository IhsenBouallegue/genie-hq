CREATE TABLE IF NOT EXISTS "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"category" text,
	"tags" jsonb,
	"images" jsonb,
	"icon_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "installation_methods" (
	"id" serial PRIMARY KEY NOT NULL,
	"application_id" integer NOT NULL,
	"os_id" integer NOT NULL,
	"package_manager_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "operating_systems" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"version" text,
	"supported_package_managers_ids" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "package_managers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"command" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "installation_methods" ADD CONSTRAINT "installation_methods_application_id_applications_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "installation_methods" ADD CONSTRAINT "installation_methods_os_id_operating_systems_id_fk" FOREIGN KEY ("os_id") REFERENCES "public"."operating_systems"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "installation_methods" ADD CONSTRAINT "installation_methods_package_manager_id_package_managers_id_fk" FOREIGN KEY ("package_manager_id") REFERENCES "public"."package_managers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
