import Hero from "../components/sections/Hero";
import AboutSection from "../components/sections/AboutSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsGrid from "../components/sections/ProjectsGrid";

export default function Home() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <Hero />
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            About
          </h2>
          <AboutSection />
        </div>
      </section>
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Experience
          </h2>
          <ExperienceSection />
        </div>
      </section>
      <section className="py-20 px-6 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Skills
          </h2>
          <SkillsSection />
        </div>
      </section>
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">
            Projects
          </h2>
          <ProjectsGrid />
        </div>
      </section>
    </main>
  );
}
