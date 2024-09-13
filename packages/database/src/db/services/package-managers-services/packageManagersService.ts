import { db } from "@/db";
import {
  type InsertPackageManager,
  packageManagersTable,
} from "@/db/schemas/schema";

/**
 * Insert the package managers into the database.
 * This function should be called before inserting other data into the database
 *
 * The data is hardcoded for now, but it can be fetched from an API in the future
 */
const insertPackageManagers = async () => {
  const packageManagers: InsertPackageManager[] = [
    {
      name: "Scoop",
      command: "scoop install",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Winget",
      command: "winget install",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: "Homebrew",
      command: "brew install",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  for (const pm of packageManagers) {
    await db.insert(packageManagersTable).values(pm);
  }
};
