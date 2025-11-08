import { motion } from "framer-motion";
import type { Skill } from "../../lib/types";

interface SkillBadgeProps extends Skill {}

export default function SkillBadge({ name, icon_url, category, proficiency }: SkillBadgeProps) {
  return (
    <motion.div
      className="flex items-center gap-2 px-4 py-2 border rounded-full border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 hover:scale-105 transition cursor-default"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      title={category ? `${category}${proficiency ? ` - Level ${proficiency}/5` : ""}` : ""}
    >
      {icon_url && <img src={icon_url} alt={name} className="w-5 h-5" />}
      <span className="text-sm font-medium">{name}</span>
    </motion.div>
  );
}
