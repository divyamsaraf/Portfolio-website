import fs from "fs";
import path from "path";

// Ensure environment variables are loaded
const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPA_URL || !SUPA_KEY) {
  console.error("Missing SUPABASE environment variables.");
  process.exit(1);
}

/**
 * Fetches all rows from a Supabase table
 * @param table - Supabase table name
 * @returns Promise resolving to array of objects
 */
async function fetchTable(table: string): Promise<any[]> {
  const res = await fetch(`${SUPA_URL}/rest/v1/${table}?select=*`, {
    headers: {
      apikey: SUPA_KEY || "",
      Authorization: `Bearer ${SUPA_KEY || ""}`,
    } as HeadersInit,
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch table "${table}": ${await res.text()}`);
  }

  return res.json();
}

/**
 * Saves JSON data to a local file
 * @param filePath - relative file path
 * @param data - JSON data to save
 */
function saveToFile(filePath: string, data: any) {
  const fullPath = path.resolve(process.cwd(), filePath);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
  console.log(`Saved ${filePath}`);
}

/**
 * Main sync function
 */
async function main() {
  try {
    const tables = ["hero", "about", "experience", "skills", "projects", "resume"];

    for (const table of tables) {
      const data = await fetchTable(table);
      saveToFile(`src/data/${table}.json`, data);
    }

    console.log("Supabase sync completed successfully.");
  } catch (err) {
    console.error("Error syncing Supabase data:", err);
    process.exit(1);
  }
}

// Run the script
main();
