import { FiCheckCircle, FiHome, FiMail, FiPhone, FiUser } from "react-icons/fi";

export default function OrderForm() {
  return (
    <form className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
      <h2 className="text-xl font-bold text-amber-400 mb-4">
        Informations de contact
      </h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-gray-300 flex items-center gap-2"
          >
            <FiUser className="text-amber-400" /> Nom:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-gray-300 flex items-center gap-2"
          >
            <FiMail className="text-amber-400" /> Mail:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="phone"
            className="text-gray-300 flex items-center gap-2"
          >
            <FiPhone className="text-amber-400" /> Téléphone:
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="adress"
            className="text-gray-300 flex items-center gap-2"
          >
            <FiHome className="text-amber-400" /> Adresse:
          </label>
          <input
            id="adress"
            name="adress"
            required
            className="bg-gray-700 text-white p-3 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <button
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          type="submit"
        >
          <FiCheckCircle /> Envoyer la commande
        </button>
      </div>
    </form>
  );
}
