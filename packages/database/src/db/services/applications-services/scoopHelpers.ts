import { db, SCOOPSEARCH_API_KEY, SCOOPSEARCH_URL } from "@/db";
import {
  type InsertApplication,
  applicationsTable,
  installationMethodsTable,
} from "@/db/schemas/schema";

const bucketMappings: { [key: string]: string } = {
  Main: "main",
  Extras: "extras",
  Versions: "versions",
  Java: "java",
  Nonportable: "nonportable",
  Nirsoft: "nirsoft",
  PHP: "php",
  "scoop-games": "games",
  "scoop-nerd-fonts": "nerd-fonts",
  "scoop-sysinternals": "sysinternals",
};

/**
 * Fetches the official Scoop apps
 */
async function fetchOfficialScoopApps() {
  const allApps = [];
  const batchSize = 1000;

  for (let i = 0; i < 6; i++) {
    // 1 to 6 batches because the max limit is 1000 apps per request and there are around 5600 apps in total as of 09/09/2024
    const requestBody = {
      count: true,
      search: "",
      searchMode: "all",
      filter:
        "Metadata/OfficialRepositoryNumber eq 1 and Metadata/DuplicateOf eq null",
      orderby:
        "search.score() desc, Metadata/OfficialRepositoryNumber desc, NameSortable asc",
      skip: i * batchSize,
      top: (i + 1) * batchSize,
      select:
        "Id,Name,NamePartial,NameSuffix,Description,Notes,Homepage,License,Version,Metadata/Repository,Metadata/FilePath,Metadata/OfficialRepository,Metadata/RepositoryStars,Metadata/Committed,Metadata/Sha",
    };

    const response = await fetch(SCOOPSEARCH_URL || "", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": SCOOPSEARCH_API_KEY || "",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    allApps.push(...data.value);
  }

  return allApps;
}

/**
 * generates the scoop bucket install package id
 */
function generateScoopBucketInstallPackageId(
  repositoryUrl: string,
  appName: string,
): string {
  const repoName = repositoryUrl.split("/").pop();
  if (!repoName) {
    throw new Error("Invalid repository URL");
  }

  const bucketName = bucketMappings[repoName] || repoName;
  return `${bucketName}/${appName}`;
}

/**
 * Saves the scoop apps to the database
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function saveScoopAppsToDatabase(apps: any[]) {
  let count = 0;
  for (const app of apps) {
    let iconUrl = app.iconUrl;
    try {
      const url = new URL(app.iconUrl);
      iconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
    } catch (error) {
      console.error(`Invalid URL: ${app.iconUrl}`, error);
    }

    const appData: InsertApplication = {
      name: app.Name,
      description: app.Description || "",
      notes: app.Notes || "",
      homepage: app.Homepage || "",
      version: app.Version || "",
      iconUrl: iconUrl,
      category: "Misc",
      tags: [],
      images: [],
      repositoryStars: app.Metadata.RepositoryStars || 0,
      lastCommitDate: app.Metadata.Committed
        ? new Date(app.Metadata.Committed)
        : null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [insertedApp] = await db
      .insert(applicationsTable)
      .values(appData)
      .returning();

    if (!insertedApp) {
      throw new Error("Failed to insert application");
    }

    const packageId = generateScoopBucketInstallPackageId(
      app.Metadata.Repository,
      app.Name,
    );

    await db.insert(installationMethodsTable).values({
      applicationId: insertedApp.id,
      osId: 1,
      packageManagerId: 1,
      packageId: packageId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (count++ % 100 === 0) {
      console.log(`Saved ${count} apps to the database so far...`);
    }
  }
}
