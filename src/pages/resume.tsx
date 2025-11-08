import ResumeSection from "../components/sections/ResumeSection";

export default function Resume() {
  return (
    <main className="bg-gray-50 dark:bg-gray-900">
      <section className="max-w-3xl mx-auto py-20 px-6">
        <h1 className="text-4xl font-bold mb-12 text-gray-900 dark:text-white">Resume</h1>
        <ResumeSection />
      </section>
    </main>
  );
}
