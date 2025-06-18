import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Start off-screen (left)
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }} // Animate in when in view
            transition={{ duration: 1 }}
            className="w-full"
          >
            <div className="text-accent  text-xl ">
              <p>
                Merci de visiter notre collection de livres ! Nous sommes là
                pour vous aider à découvrir de nouvelles lectures, répondre à
                toutes vos questions et partager ce qui rend notre Librairie
                spéciale.
              </p>
              <hr className="my-5 w-[50%]" />
              <p>
                Vous avez des questions sur notre collection ou besoin d`une
                recommandation de livre ? Nous sommes là pour vous aider ! Que
                vous soyez curieux d`un titre spécifique, d`un genre, ou que
                vous souhaitiez en savoir plus sur notre Librairie, n`hésitez
                pas à nous contacter. Nous serions ravis d`avoir de vos
                nouvelles !
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }} // Start off-screen (right)
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }} // Animate in when in view
            transition={{ duration: 1 }}
            className=" w-full"
          >
            <form className="border text-accent border-gray-500 p-3 rounded-lg flex flex-col gap-4 w-full  shadow-md">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-accent">
                  Nom:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="outline-none p-1 rounded bg-[#222] "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="email">Mail:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="outline-none p-1 rounded bg-[#222] text-accent focus:outline-none "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="phone">Téléphone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className=" p-1 rounded bg-[#222] text-accent outline-none "
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="message">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="outline-none p-1 rounded bg-[#222] text-accent "
                />
              </div>
              <button
                className="bg-amber-600 text-white py-2 rounded-md hover:bg-amber-500 focus:outline-none w-full md:w-auto cursor-pointer"
                type="submit"
              >
                Envoyer
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
