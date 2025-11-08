import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createClient } from "@supabase/supabase-js";
import type { Education } from "../../lib/types";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function EducationSection() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("education")
          .select("*")
          .order("end_date", { ascending: false, nullsFirst: false });

        if (fetchError) throw fetchError;
        setEducation(data || []);
      } catch (err) {
        console.error("Error fetching education:", err);
        setError("Failed to load education data");
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500 dark:text-red-400">
        {error}
      </div>
    );
  }

  if (education.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        No education data available
      </div>
    );
  }

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "Present";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <motion.div
          key={edu.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="relative pl-8 pb-8 border-l-2 border-gradient-to-b from-blue-500 to-purple-500 last:pb-0"
        >
          {/* Timeline dot */}
          <div className="absolute -left-4 top-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-slate-900 dark:border-slate-950" />

          <motion.div
            className="bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 rounded-lg p-6 border border-slate-700 dark:border-slate-700 hover:border-blue-500/50 transition-all"
            whileHover={{ y: -5 }}
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-3">
              <div>
                <h3 className="text-xl font-bold text-white">
                  {edu.degree}
                  {edu.field_of_study && ` in ${edu.field_of_study}`}
                </h3>
                <p className="text-blue-400 font-semibold">{edu.institution}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">
                  {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                </p>
                {edu.gpa && (
                  <p className="text-sm text-purple-400 font-semibold">
                    GPA: {edu.gpa.toFixed(2)}
                  </p>
                )}
              </div>
            </div>

            {edu.description && (
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                {edu.description}
              </p>
            )}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

