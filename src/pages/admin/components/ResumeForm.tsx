import { useState } from "react";
import axiosWithAuth from "../../../lib/axiosClient";
import { motion } from "framer-motion";

export default function ResumeForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    if (!file.name.endsWith(".pdf")) {
      alert("Please select a PDF file!");
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      await axiosWithAuth.post("/api/admin/uploadResume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Resume uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error("Failed to upload resume:", err);
      alert("Failed to upload resume");
    } finally {
      setUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Resume Upload</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Select PDF File
        </label>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Selected: {file.name}
          </p>
        )}
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-md transition"
      >
        {uploading ? "Uploading..." : "Upload Resume"}
      </button>
    </motion.div>
  );
}
