import { motion } from "framer-motion";
import type { Experience } from "../../lib/types";

interface ExperienceCardProps extends Experience {}

export default function ExperienceCard({
  role,
  company,
  start_date,
  end_date,
  description,
  bullets,
  location,
}: ExperienceCardProps) {
  const duration = end_date ? `${start_date} - ${end_date}` : `${start_date} - Present`;

  return (
    <motion.div
      className="p-6 border rounded-lg shadow hover:shadow-lg transition bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
        <div>
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">{role}</h3>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">{company}</p>
        </div>
        {location && <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{duration}</p>
      <p className="text-gray-700 dark:text-gray-300 mb-3">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="text-sm">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
