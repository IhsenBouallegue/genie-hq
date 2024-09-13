import { db } from "@/db";
import {
  operatingSystemsTable,
  type InsertOperatingSystem,
} from "@/db/schemas/schema";

/**
 * Insert the package managers into the database.
 * This function should be called before inserting other data into the database
 *
 * The data is hardcoded for now, but it can be fetched from an API in the future
 */
const insertOperatingSystems = async () => {
  const operatingSystems: InsertOperatingSystem[] = [
    {
      name: "Windows",
      version: "10",
      supportedPackageManagersIds: [1, 2],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "macOS",
      version: "11.2",
      supportedPackageManagersIds: [3],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const os of operatingSystems) {
    await db.insert(operatingSystemsTable).values(os);
  }
};
