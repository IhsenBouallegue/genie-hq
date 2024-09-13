import { db } from "../../index";
import { URL } from "node:url";
import {
  applicationsTable,
  installationMethodsTable,
  operatingSystemsTable,
  packageManagersTable,
  type InsertApplication,
  type InsertOperatingSystem,
  type InsertPackageManager,
} from "../../schemas/schema";
import { eq } from "drizzle-orm";

