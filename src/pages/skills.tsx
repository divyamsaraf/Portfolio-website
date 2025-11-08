import SkillsSection from "../components/sections/SkillsSection";

export default function Skills() {
  return (
    <main className="bg-white dark:bg-gray-800">
      <section className="max-w-5xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">Skills</h1>
        <SkillsSection />
      </section>
    </main>
  );
}
