import { motion } from "framer-motion";
import type { Skill } from "../../lib/types";

interface SkillBadgeProps extends Skill {}

export default function SkillBadge({ name, icon_url, category, proficiency }: SkillBadgeProps) {
  // Convert proficiency to percentage (1-5 scale to 0-100%)
  const proficiencyPercentage = proficiency ? (proficiency / 5) * 100 : 0;

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="flex flex-col items-center gap-2 px-4 py-3 border rounded-lg border-gray-300 dark:border-gray-600 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-default"
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.2)" }}
      >
        {/* Icon */}
        {icon_url && (
          <motion.img
            src={icon_url}
            alt={name}
            className="w-6 h-6"
            whileHover={{ rotate: 10, scale: 1.2 }}
          />
        )}

        {/* Name */}
        <span className="text-sm font-semibold text-gray-900 dark:text-white text-center">{name}</span>

        {/* Proficiency Bar */}
        {proficiency && (
          <div className="w-full mt-2">
            <div className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ width: 0 }}
                whileInView={{ width: `${proficiencyPercentage}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
              {proficiency}/5
            </p>
          </div>
        )}
      </motion.div>

      {/* Tooltip */}
      {(category || proficiency) && (
        <motion.div
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10"
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
        >
          {category && <p className="font-semibold">{category}</p>}
          {proficiency && <p className="text-gray-300">Proficiency: {proficiency}/5</p>}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
}
