import { HOMEBREW_FORMULA_API_URL, HOMEBREW_CASK_API_URL, db } from "@/db";
import {
  type InsertApplication,
  applicationsTable,
  installationMethodsTable,
} from "@/db/schemas/schema";

const brewIconUrl = "https://formulae.brew.sh/assets/img/homebrew.svg";

/**
 * Fetches Homebrew formula apps
 */
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
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
      iconUrl = brewIconUrl;
    } else {
      try {
        const url = new URL(formula.homepage);
        iconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
      } catch (error) {
        console.error(`Invalid URL: ${formula.homepage}`, error);
        iconUrl = brewIconUrl;
      }
    }

    return {
      name: formula.name,
      description: formula.desc || "",
      homepage: formula.homepage || "",
      version: formula.versions.stable || "",
      packageId: formula.name,
      iconUrl: iconUrl,
      notes: notes.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  console.log(`Fetched ${apps.length} Homebrew formula apps.`);
  return apps;
}

/**
 * Fetches Homebrew cask apps
 */
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
      iconUrl = brewIconUrl;
    } else {
      try {
        const url = new URL(cask.homepage);
        iconUrl = `${url.protocol}//${url.hostname}/favicon.ico`;
      } catch (error) {
        console.error(`Invalid URL: ${cask.homepage}`, error);
        iconUrl = brewIconUrl;
      }
    }

    return {
      name: cask.token,
      description: cask.desc || "",
      homepage: cask.homepage || "",
      version: cask.version || "",
      packageId: cask.token,
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
      createdAt: new Date(),
      updatedAt: new Date(),
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
      packageId: app.packageId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (count++ % 100 === 0) {
      console.log(`Saved ${count} Homebrew apps to the database so far...`);
    }
  }
}
