import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "213671265377";
  return (
    <a
      className="text-green-500 fixed bottom-4 right-2"
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
