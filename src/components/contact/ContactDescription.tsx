import { motion } from "framer-motion";
export default function ContactDescription({
  isInView,
}: {
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }} // Start off-screen (left)
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }} // Animate in when in view
      transition={{ duration: 1 }}
      className="w-full"
    >
      <div className="  text-xl ">
        <p>
          Merci de visiter{" "}
          <span className="text-amber-500 font-medium">Online library</span> !
          Nous sommes là pour vous aider à découvrir de nouvelles lectures, à
          choisir des articles de papeterie inspirants, à trouver des jeux
          amusants ou des cadeaux parfaits pour vos proches. N’hésitez pas à
          nous poser vos questions ou à explorer ce qui rend notre boutique si
          spéciale.
        </p>
        <hr className="my-5 w-[50%] text-amber-600 " />
        <p>
          Vous avez des questions sur notre collection ou besoin d`une
          recommandation de livre ? Nous sommes là pour vous aider ! Que vous
          soyez curieux d`un titre spécifique, d`un genre, ou que vous
          souhaitiez en savoir plus sur notre Librairie, n`hésitez pas à nous
          contacter. Nous serions ravis d`avoir de vos nouvelles !
        </p>
        <hr className="my-5 w-[50%] text-amber-600" />
        <p>
          Vous pouvez également nous appeler directement via WhatsApp en
          cliquant sur le bouton en bas à droite de votre écran !
        </p>
      </div>
    </motion.div>
  );
}
