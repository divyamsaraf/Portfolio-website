import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import ContactForm from "../ContactForm";
import type { Contact } from "../../lib/types";

const DEFAULT_CONTACT: Contact = {
  linkedin: "https://www.linkedin.com/in/divyam-saraf/",
  github: "https://github.com/divyamsaraf",
  collaboration_roles: [
    "Open for Collaboration",
    "Projects",
    "Open Source Contribution",
  ],
};

export default function ContactSection() {
  const [contact, setContact] = useState<Contact>(DEFAULT_CONTACT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from("contact")
          .select("*")
          .single();
        if (supabaseError) {
          console.warn("Failed to fetch contact from Supabase, using defaults:", supabaseError);
          setContact(DEFAULT_CONTACT);
        } else if (data) {
          setContact(data);
        }
      } catch (err) {
        console.error("Failed to fetch contact:", err);
        setContact(DEFAULT_CONTACT);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  if (loading) {
    return (
      <motion.section className="max-w-3xl mx-auto py-20 px-4 text-center">
        <p className="text-gray-500 dark:text-gray-400">Loading...</p>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="max-w-4xl mx-auto px-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Collaboration Roles */}
      {contact.collaboration_roles && contact.collaboration_roles.length > 0 && (
        <motion.div
          className="mb-12 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {contact.collaboration_roles.map((role, idx) => (
            <motion.span
              key={idx}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 text-sm font-medium backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "rgba(34, 211, 238, 0.6)" }}
            >
              ✨ {role}
            </motion.span>
          ))}
        </motion.div>
      )}

      {/* Contact Information Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {/* LinkedIn */}
        {contact.linkedin && (
          <motion.a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(34, 211, 238, 0.2)" }}
            className="p-6 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-cyan-500/20 hover:border-cyan-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">LinkedIn</p>
                <p className="text-lg font-semibold text-gray-100">Connect with me</p>
              </div>
            </div>
          </motion.a>
        )}

        {/* GitHub */}
        {contact.github && (
          <motion.a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(168, 85, 247, 0.2)" }}
            className="p-6 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-pink-500/20 hover:border-pink-500/50 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center">
                <span className="text-2xl">🐙</span>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">GitHub</p>
                <p className="text-lg font-semibold text-gray-100">View my projects</p>
              </div>
            </div>
          </motion.a>
        )}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <ContactForm showTitle={false} />
      </motion.div>
    </motion.section>
  );
}

