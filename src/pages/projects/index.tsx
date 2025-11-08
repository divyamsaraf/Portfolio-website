import ProjectsGrid from "../../components/sections/ProjectsGrid";

export default function Projects() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <section className="max-w-6xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">Projects</h1>
        <ProjectsGrid />
      </section>
    </main>
  );
}

