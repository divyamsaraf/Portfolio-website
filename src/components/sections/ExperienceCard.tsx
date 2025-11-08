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
  const isCurrentRole = !end_date;

  return (
    <motion.div
      className="relative p-6 border rounded-lg bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Gradient background on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Current role badge */}
      {isCurrentRole && (
        <motion.div
          className="absolute top-4 right-4 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-semibold rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          Current
        </motion.div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">{role}</h3>
          <p className="text-blue-600 dark:text-blue-400 font-semibold">{company}</p>
        </motion.div>
        {location && (
          <motion.p
            className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </motion.p>
        )}
      </div>

      {/* Duration */}
      <motion.p
        className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {duration}
      </motion.p>

      {/* Description */}
      <motion.p
        className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {description}
      </motion.p>

      {/* Bullets */}
      {bullets && bullets.length > 0 && (
        <motion.ul
          className="space-y-2 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {bullets.map((bullet, idx) => (
            <motion.li
              key={idx}
              className="text-sm flex gap-3"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 + idx * 0.05 }}
            >
              <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">•</span>
              <span>{bullet}</span>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
}
