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
} from "./schemas/schema";
import { eq } from "drizzle-orm";

/**
 * calls the /rate_limit endpoint of the Github API to check the rate limit.
 */
const checkGithubApiRateLimit = async () => {
  // call the /rate_limit endpoint to check the rate limit
  // if the rate limit is exceeded, wait for the reset time
  // before making the next request
  const rateLimitEP = "https://api.github.com/rate_limit";
  const response = await fetch(rateLimitEP);
  const data = await response.json();
  console.log(data);
};

async function main() {
  try {
    // insertPackageManagers();
    // insertOperatingSystems();

    // step 1: fetch and save scoop "official-packages"-apps to the database
    // const apps = await fetchOfficialScoopApps();
    // console.log(`Fetched ${apps.length} official Scoop apps.`);
    // await saveScoopAppsToDatabase(apps);
    // console.log("Apps successfully saved to the database.");

    // step 2: fetch and save winget apps to the database
    // const wingetApps = await fetchWingetApps();
    // console.log(`Fetched ${wingetApps.length} Winget apps.`);
    // await saveWingetAppsToDatabase(wingetApps);

    // step 3a: fetch and save homebrew formula apps to the database
    // const homebrewFormulaApps = await fetchHomebrewFormulaApps();
    // await saveHomebrewAppsToDatabase(homebrewFormulaApps);

    // step 3b: fetch and save homebrew cask apps to the database
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
