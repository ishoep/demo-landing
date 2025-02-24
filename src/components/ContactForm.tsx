import React, { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../translations";
import { Send, MapPin, Phone, Clock } from "lucide-react";

const ContactForm: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const response = await fetch("https://formspree.io/f/mlddvkad", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setStatus("success");
      setFormData({ name: "", phone: "", message: "" });
    } else {
      setStatus("error");
    }
  };

  return (
    <section
      id="contacts"
      className="py-20 flex items-center justify-center px-4 transition-colors duration-300"
    >
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg overflow-hidden w-full max-w-4xl grid md:grid-cols-2">
        {/* Левая часть - Информация */}
        <div className="p-8 bg-white dark:bg-gray-800 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700 dark:text-gray-300">{t.location}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700 dark:text-gray-300">{t.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-6 h-6 text-blue-600" />
            <p className="text-gray-700 dark:text-gray-300">{t.hours}</p>
          </div>
        </div>

        {/* Правая часть - Форма */}
        <div className="p-8 bg-white dark:bg-gray-900">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white h-12"  // Увеличена высота
                required
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t.email}
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white h-12"  // Увеличена высота
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {t.message}
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Send className="w-5 h-5 mr-2" />
              {t.submit}
            </button>

            {status === "success" && (
              <p className="text-green-500 text-center mt-2">
                ✅ {t.success}
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500 text-center mt-2">
                ❌ {t.error}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
