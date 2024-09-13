import { WINGET_API_URL, db } from "@/db";
import {
  type InsertApplication,
  applicationsTable,
  installationMethodsTable,
} from "@/db/schemas/schema";

const wingetIconUrl = "https://winget.run/assets/icon.png";

/**
 * Fetches the Winget apps
 */
async function fetchWingetApps(
  pageSize = 100,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<any[]> {
  const allApps = [];
  let page = 1;

  while (true) {
    const response = await fetch(
      `${WINGET_API_URL}?page=${page}&perPage=${pageSize}&ensureContains=true&partialMatch=true&take=20`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error(`Failed to fetch Winget apps: ${response.statusText}`);
      break;
    }

    const data = await response.json();
    if (!data.Packages || data.Packages.length === 0) break; // this api returns an empty array when there are no more packages, so we break the loop

    try {
      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const apps = data.Packages.map((pkg: any) => ({
        name: pkg.Latest.Name,
        description: pkg.Latest.Description || "",
        homepage: pkg.Latest.Homepage || "",
        version: pkg.Versions[0] || "",
        iconUrl: pkg.IconUrl || "",
        tags: pkg.Latest.Tags || [],
        images: pkg.Logo || "",
        publisher: pkg.Latest.Publisher || "",
        packageId: pkg.Id,
      }));

      allApps.push(...apps);
    } catch (error) {
      console.error("Error mapping Winget package data:", error);
    }

    console.log(`Total Winget apps fetched so far: ${allApps.length}`);
    page++;
  }

  return allApps;
}

/**
 * Saves the Winget apps to the database
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function saveWingetAppsToDatabase(apps: any[]) {
  let count = 0;
  for (const app of apps) {
    let iconUrl: string;

    if (app.iconUrl === "" || app.iconUrl === null) {
      if (app.homepage === "" || app.homepage === null) {
        iconUrl = wingetIconUrl;
      } else {
        try {
          const url = new URL(app.homepage);
          iconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
        } catch (error) {
          console.error(`Invalid URL: ${app.homepage}`, error);
          iconUrl = wingetIconUrl;
        }
      }
    } else {
      iconUrl = app.iconUrl;
    }

    const appData: InsertApplication = {
      name: app.name,
      description: app.description || "",
      homepage: app.homepage || "",
      version: app.version || "",
      iconUrl: iconUrl,
      category: "Misc",
      tags: app.tags || [],
      images: app.images || [],
      notes: `Publisher: ${app.publisher}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const [insertedApp] = await db
      .insert(applicationsTable)
      .values(appData)
      .returning();

    if (!insertedApp) {
      throw new Error("Failed to insert Winget application");
    }

    await db.insert(installationMethodsTable).values({
      applicationId: insertedApp.id,
      osId: 1,
      packageManagerId: 2,
      packageId: app.packageId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (count++ % 100 === 0) {
      console.log(`Saved ${count} Winget apps to the database so far...`);
    }
  }
}
