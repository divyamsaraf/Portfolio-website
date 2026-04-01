const { createClient } = require("@supabase/supabase-js");

const SUPA_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPA_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPA_URL || !SUPA_KEY) {
  console.error("Missing SUPABASE environment variables");
  process.exit(1);
}

const supabase = createClient(SUPA_URL, SUPA_KEY);

const projectSkills = [
  // Languages
  { name: "JavaScript", category: "Languages", proficiency: 5 },
  { name: "TypeScript", category: "Languages", proficiency: 5 },
  { name: "HTML", category: "Languages", proficiency: 5 },
  { name: "CSS", category: "Languages", proficiency: 4 },
  { name: "SQL", category: "Languages", proficiency: 4 },
  // Frameworks
  { name: "React", category: "Frameworks", proficiency: 5 },
  { name: "Next.js", category: "Frameworks", proficiency: 5 },
  { name: "Node.js", category: "Frameworks", proficiency: 4 },
  { name: "Tailwind CSS", category: "Frameworks", proficiency: 5 },
  { name: "Framer Motion", category: "Frameworks", proficiency: 4 },
  // Cloud & DevOps
  { name: "Vercel", category: "Cloud & DevOps", proficiency: 5 },
  { name: "GitHub Actions", category: "Cloud & DevOps", proficiency: 4 },
  { name: "Husky", category: "Cloud & DevOps", proficiency: 4 },
  // Platform & Admin
  { name: "GitHub", category: "Platform & Admin", proficiency: 5 },
  { name: "Jira / Linear", category: "Platform & Admin", proficiency: 4 },
  // Databases
  { name: "PostgreSQL", category: "Databases", proficiency: 4 },
  { name: "Supabase", category: "Databases", proficiency: 5 },
  // Other
  { name: "REST APIs", category: "Other", proficiency: 5 },
  { name: "Zod", category: "Other", proficiency: 5 },
  { name: "Jest", category: "Other", proficiency: 4 },
  { name: "ESLint", category: "Other", proficiency: 4 },
  { name: "Prettier", category: "Other", proficiency: 5 },
];

async function main() {
  console.log("Deleting existing skills...");
  const { error: deleteError } = await supabase.from("skills").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  if (deleteError) {
    console.error("Error deleting skills:", deleteError);
    process.exit(1);
  }

  console.log("Inserting project stack...");
  const { error: insertError } = await supabase.from("skills").insert(projectSkills);

  if (insertError) {
    console.error("Error inserting skills:", insertError);
    process.exit(1);
  }

  console.log("Successfully seeded database with project stack!");
}

main();
