import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

interface ContactFormProps {
  showTitle?: boolean;
}

export default function ContactForm({ showTitle = true }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/contact", {
        name: form.name,
        email: form.email,
        message: form.message,
      });
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error("Failed to send message:", err);
      setError(err.response?.data?.error || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-16 px-6 max-w-2xl mx-auto"
    >
      {showTitle && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
        >
          Get In Touch
        </motion.h2>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded-lg text-green-800 dark:text-green-200 text-center"
        >
          ✅ Thanks for reaching out! I&apos;ll get back to you soon.
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 rounded-lg text-red-800 dark:text-red-200 text-center"
        >
          ❌ {error}
        </motion.div>
      )}

      <motion.form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div whileHover={{ scale: 1.02 }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={form.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition resize-none"
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
            disabled={loading}
          />
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition-all"
        >
          {loading ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </motion.section>
  );
}
