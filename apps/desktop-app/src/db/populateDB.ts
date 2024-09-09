/**
 * This script is used to populate the database with applications
 * from different package managers like Scoop, Winget, and Homebrew.
 * It fetches the data from the respective APIs and saves it to the database.
 *
 * To run this script, you need to set the following environment variables:
 * - SCOOPSEARCH_URL: The URL of the ScoopSearch API
 * - SCOOPSEARCH_API_KEY: The API key for the ScoopSearch API
 * - WINGET_API_URL: The URL of the Winget API
 * - DATABASE_URL: The URL of the database
 * after setting the environment variables, you can run the script using the following command:
 * `bun run path/to/populateDB.ts`
 *
 * The script performs the following steps:
 * 1. Fetch official Scoop apps from the ScoopSearch API
 * 2. Save the Scoop apps to the database
 * (3). Correct the icon URLs for all applications in the database (The new version of the script doesn't need this step)
 * 4. Fetch Winget apps from the Winget API
 * 5. Save the Winget apps to the database
 * 6. Fetch Homebrew apps (Not implemented yet)
 * 7. Coming soon...
 */

import { db } from "./index";
import { URL } from "node:url";
import {
  applicationsTable,
  installationMethodsTable,
  operatingSystemsTable,
  packageManagersTable,
  type InsertApplication,
  type InsertOperatingSystem,
  type InsertPackageManager,
} from "./schema";
import { eq } from "drizzle-orm";

const checkGithubApiRateLimit = async () => {
  // call the /rate_limit endpoint to check the rate limit
  // if the rate limit is exceeded, wait for the reset time
  // before making the next request
  const rateLimitEP = "https://api.github.com/rate_limit";
  const response = await fetch(rateLimitEP);
  const data = await response.json();
  console.log(data);
};

const SCOOPSEARCH_URL = process.env.SCOOPSEARCH_URL;
const SCOOPSEARCH_API_KEY = process.env.SCOOPSEARCH_API_KEY;
const WINGET_API_URL = process.env.WINGET_API_URL;
const HOMEBREW_FORMULA_API_URL = process.env.HOMEBREW_FORMULA_API_URL;
const HOMEBREW_CASK_API_URL = process.env.HOMEBREW_CASK_API_URL;

// Function to fetch official Scoop apps
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

function generateScoopInstallCommand(
  repositoryUrl: string,
  appName: string,
): string {
  const repoName = repositoryUrl.split("/").pop();
  if (!repoName) {
    throw new Error("Invalid repository URL");
  }

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

  const bucketName = bucketMappings[repoName] || repoName;

  const bucketCommand = `scoop bucket add ${bucketName}`;
  const installCommand = `scoop install ${bucketName}/${appName}`;

  // console.log(`Bucket command: ${bucketCommand}`);
  // console.log(`Install command: ${installCommand}`);

  return `${bucketCommand} && ${installCommand}`;
}

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
      description: app.Description || "No description",
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

    const installCommand = generateScoopInstallCommand(
      app.Metadata.Repository,
      app.Name,
    );

    await db.insert(installationMethodsTable).values({
      applicationId: insertedApp.id,
      osId: 1,
      packageManagerId: 1,
      command: installCommand,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (count++ % 100 === 0) {
      console.log(`Saved ${count} apps to the database so far...`);
    }
  }
}

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
        publisher: pkg.Latest.Publisher || "Unknown publisher",
        installCommand: `winget install --id ${pkg.Id}`,
        createdAt: new Date(pkg.CreatedAt || Date.now()),
        updatedAt: new Date(pkg.UpdatedAt || Date.now()),
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

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function saveWingetAppsToDatabase(apps: any[]) {
  let count = 0;
  for (const app of apps) {
    let iconUrl: string;

    if (app.iconUrl === "" || app.iconUrl === null) {
      if (app.homepage === "" || app.homepage === null) {
        iconUrl = "https://winget.run/assets/icon.png";
      } else {
        try {
          const url = new URL(app.homepage);
          iconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
        } catch (error) {
          console.error(`Invalid URL: ${app.homepage}`, error);
          iconUrl = "https://winget.run/assets/icon.png";
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
      createdAt: app.createdAt,
      updatedAt: app.updatedAt,
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
      command: app.installCommand,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (count++ % 100 === 0) {
      console.log(`Saved ${count} Winget apps to the database so far...`);
    }
  }
}

// Function to fetch Homebrew formula apps
async function fetchHomebrewFormulaApps(): Promise<any[]> {
  const response = await fetch(HOMEBREW_FORMULA_API_URL || "", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error(
      `Failed to fetch Homebrew formula apps: ${response.statusText}`,
    );
    return [];
  }

  const data = await response.json();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const apps = data.map((formula: any) => {
    const isDeprecated = formula.deprecated;
    const isOutdated = formula.outdated;
    const deprecationDate = formula.deprecation_date
      ? new Date(formula.deprecation_date).toLocaleDateString()
      : null;
    const disableDate = formula.disable_date
      ? new Date(formula.disable_date).toLocaleDateString()
      : null;

    let notes = `License: ${formula.license || "Unknown license"}.`;
    if (formula.caveats) notes += ` ${formula.caveats}`;
    if (isDeprecated)
      notes += ` This app is deprecated${deprecationDate ? ` since ${deprecationDate}` : ""}.`;
    if (isOutdated) notes += " This app is outdated.";
    if (disableDate) notes += ` Disabled since ${disableDate}.`;

    let iconUrl: string;

    if (formula.homepage === "" || formula.homepage === null) {
      iconUrl = "https://formulae.brew.sh/assets/img/homebrew.svg";
    } else {
      try {
        const url = new URL(formula.homepage);
        iconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
      } catch (error) {
        console.error(`Invalid URL: ${formula.homepage}`, error);
        iconUrl = "https://formulae.brew.sh/assets/img/homebrew.svg";
      }
    }

    return {
      name: formula.name,
      description: formula.desc || "",
      homepage: formula.homepage || "",
      version: formula.versions.stable || "",
      installCommand: `brew install ${formula.name}`,
      iconUrl: iconUrl,
      notes: notes.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  console.log(`Fetched ${apps.length} Homebrew formula apps.`);
  return apps;
}

// Function to fetch Homebrew cask apps
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function fetchHomebrewCaskApps(): Promise<any[]> {
  const response = await fetch(HOMEBREW_CASK_API_URL || "", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    console.error(`Failed to fetch Homebrew cask apps: ${response.statusText}`);
    return [];
  }

  const data = await response.json();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const apps = data.map((cask: any) => {
    const isDeprecated = cask.deprecated;
    const isOutdated = cask.outdated;
    const deprecationDate = cask.deprecation_date
      ? new Date(cask.deprecation_date).toLocaleDateString()
      : null;
    const disableDate = cask.disable_date
      ? new Date(cask.disable_date).toLocaleDateString()
      : null;

    let notes = `License: ${cask.license || "Unknown license"}.`;
    if (cask.caveats) notes += ` ${cask.caveats}`;
    if (isDeprecated)
      notes += ` This app is deprecated${deprecationDate ? ` since ${deprecationDate}` : ""}.`;
    if (isOutdated) notes += " This app is outdated.";
    if (disableDate) notes += ` Disabled since ${disableDate}.`;

    let iconUrl: string;

    if (cask.homepage === "" || cask.homepage === null) {
      iconUrl = "https://formulae.brew.sh/assets/img/homebrew.svg";
    } else {
      try {
        const url = new URL(cask.homepage);
        iconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
      } catch (error) {
        console.error(`Invalid URL: ${cask.homepage}`, error);
        iconUrl = "https://formulae.brew.sh/assets/img/homebrew.svg";
      }
    }

    return {
      name: cask.token,
      description: cask.desc || "",
      homepage: cask.homepage || "",
      version: cask.version || "",
      installCommand: `brew install ${cask.token}`,
      iconUrl: iconUrl,
      notes: notes.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  console.log(`Fetched ${apps.length} Homebrew cask apps.`);
  return apps;
}

// Function to save Homebrew apps to the database
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function saveHomebrewAppsToDatabase(apps: any[]) {
  let count = 0;
  for (const app of apps) {
    const appData: InsertApplication = {
      name: app.name,
      description: app.description || "",
      homepage: app.homepage || "",
      version: app.version || "",
      iconUrl: app.iconUrl || "",
      category: "Misc",
      tags: [],
      images: [],
      notes: app.notes || "",
      createdAt: app.createdAt || new Date(),
      updatedAt: app.updatedAt || new Date(),
    };

    const [insertedApp] = await db
      .insert(applicationsTable)
      .values(appData)
      .returning();

    if (!insertedApp) {
      throw new Error("Failed to insert Homebrew application");
    }

    await db.insert(installationMethodsTable).values({
      applicationId: insertedApp.id,
      osId: 2,
      packageManagerId: 3,
      command: app.installCommand,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (count++ % 100 === 0) {
      console.log(`Saved ${count} Homebrew apps to the database so far...`);
    }
  }
}

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

/**
 * Function to correct the iconUrl by appending /favicon.ico to the URL
 * @param iconUrl - The icon URL to correct
 * @returns The corrected icon URL
 */
function correctIconUrl(iconUrl: string): string {
  try {
    const url = new URL(iconUrl);
    return `${url.protocol}//${url.hostname}/favicon.ico`;
  } catch (error) {
    console.error(`Invalid URL: ${iconUrl}`, error);
    return iconUrl; // Return the original URL if it's invalid
  }
}

/**
 * Correct the icon URLs for all applications in the database
 * by appending /favicon.ico to the URL
 * It was created to fix badly parsed iconUrls in the applicationsTable
 *
 */
async function correctApplicationIconUrls() {
  const applications = await db.select().from(applicationsTable);

  for (const app of applications) {
    if (!app.iconUrl) {
      continue;
    }
    const correctedIconUrl = correctIconUrl(app.iconUrl);

    await db
      .update(applicationsTable)
      .set({ iconUrl: correctedIconUrl })
      .where(eq(applicationsTable.id, app.id));

    console.log(`Updated iconUrl for application ${app.name}`);
  }

  console.log("All iconUrls have been corrected.");
}

async function main() {
  try {
    // step 1: fetch and save scoop "official-packages"-apps to the database

    // insertPackageManagers();
    // insertOperatingSystems();
    // const apps = await fetchOfficialScoopApps();
    // console.log(`Fetched ${apps.length} official Scoop apps.`);

    // await saveScoopAppsToDatabase(apps);
    // console.log("Apps successfully saved to the database.");

    // step 2: corrected the icon urls
    // await correctApplicationIconUrls();

    // step 3: fetch and save winget apps to the database
    // const wingetApps = await fetchWingetApps();
    // console.log(`Fetched ${wingetApps.length} Winget apps.`);
    // await saveWingetAppsToDatabase(wingetApps);

    // step 4a: fetch and save homebrew formula apps to the database
    // const homebrewFormulaApps = await fetchHomebrewFormulaApps();
    // await saveHomebrewAppsToDatabase(homebrewFormulaApps);

    // step 4b: fetch and save homebrew cask apps to the database
    // const homebrewCaskApps = await fetchHomebrewCaskApps();
    // await saveHomebrewAppsToDatabase(homebrewCaskApps);
    console.log("All apps have been saved to the database.");
  } catch (error) {
    console.error("Error saving apps to the database:", error);
  }
}

main().catch((error) => {
  console.error("Error populating the database:", error);
});
