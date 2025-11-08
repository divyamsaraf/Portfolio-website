import AboutSection from "../components/sections/AboutSection";

export default function About() {
  return (
    <main className="bg-white dark:bg-gray-800">
      <section className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">About Me</h1>
        <AboutSection />
      </section>
    </main>
  );
}
