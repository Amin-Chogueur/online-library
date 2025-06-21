import { useInView } from "framer-motion";
import { useRef } from "react";
import ContactDescription from "../components/contact/ContactDescription";
import ContactForm from "../components/contact/ContactForm";

function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className=" flex justify-center items-center ">
      <div ref={ref}>
        <h2 className="text-amber-500 text-3xl text-center mb-12 ">
          Contactez-nous
        </h2>
        <div className="flex flex-col md:flex-row gap-20 justify-between items-start   w-full  mx-auto mt-6 ">
          <ContactDescription isInView={isInView} />
          <ContactForm isInView={isInView} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
