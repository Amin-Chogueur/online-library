import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "213671265377";
  return (
    <div className="bg-green-500 rounded-full p-2 fixed bottom-4 right-2 z-50">
      <a
        className=" "
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp className="text-3xl" />
      </a>
    </div>
  );
}
