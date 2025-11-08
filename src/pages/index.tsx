import { useEffect } from "react";
import { useRouter } from "next/router";
import Hero from "../components/sections/Hero";
import AboutSection from "../components/sections/AboutSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import ProjectsGrid from "../components/sections/ProjectsGrid";
import SkillsSection from "../components/sections/SkillsSection";
import EducationSection from "../components/sections/EducationSection";
import CollaborationSection from "../components/sections/CollaborationSection";
import ResumeSection from "../components/sections/ResumeSection";
import ContactForm from "../components/ContactForm";
import GoToTopButton from "../components/GoToTopButton";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Handle section navigation from query parameter
    if (router.query.section) {
      const sectionId = router.query.section as string;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [router.query.section]);
  return (
    <main className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            About
          </h2>
          <AboutSection />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Experience
          </h2>
          <ExperienceSection />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Projects
          </h2>
          <ProjectsGrid />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Skills
          </h2>
          <SkillsSection />
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Education
          </h2>
          <EducationSection />
        </div>
      </section>

      {/* Resume Section */}
      <section id="resume" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Resume
          </h2>
          <ResumeSection />
        </div>
      </section>

      {/* Collaboration Section */}
      <section id="collaboration" className="relative py-20 px-6 scroll-mt-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
            Open for Collaboration
          </h2>
          <CollaborationSection />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6 scroll-mt-20">
        <ContactForm showTitle={true} />
      </section>

      {/* Go to Top Button */}
      <GoToTopButton />
    </main>
  );
}
