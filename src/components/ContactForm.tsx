import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: use Resend API later
    window.location.href = `mailto:youremail@example.com?subject=Portfolio Contact&body=${form.message}`;
    setSubmitted(true);
  };

  if (submitted)
    return <p className="text-center text-green-500">Thanks! Your message has been sent.</p>;

  return (
    <section className="py-16 px-8 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Contact Me</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          className="border p-2 rounded"
          value={form.message}
          onChange={handleChange}
          rows={5}
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
          Send
        </button>
      </form>
    </section>
  );
}
