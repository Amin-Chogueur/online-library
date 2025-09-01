import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Triggers when element is
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 ">
      <h1 className="text-amber-500 text-3xl  text-center mb-12 font-bold">
        À Propos de Nous
      </h1>

      <div
        ref={ref}
        className="flex flex-col lg:flex-row justify-between gap-12"
      >
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -100 }} // Start off-screen (left)
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }} // Animate in when in view
            transition={{ duration: 1 }}
          >
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={"/about.jpg"}
                alt="About Ghiz Read Librairie"
                width={800}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>

        <div className="lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: 100 }} // Start off-screen (right)
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }} // Animate in when in view
            transition={{ duration: 1 }}
          >
            {" "}
            <div className="mb-8">
              <h3 className="text-amber-500 text-2xl md:text-3xl font-semibold mb-4">
                Bienvenue chez Online library!
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Chez Online library, nous croyons que chaque objet – qu’il
                s’agisse d’un livre, d’un jeu, d’un article de papeterie ou d’un
                petit cadeau – peut ouvrir la porte à une aventure, à
                l’imagination et à la découverte. Notre collection soigneusement
                sélectionnée propose un large éventail de produits : des livres
                pour tous les âges, des histoires captivantes pour enfants, de
                la papeterie élégante, des jeux amusants et des idées cadeaux
                pour toutes les occasions.
              </p>
            </div>
            <div className="mb-8">
              <h3 className="text-amber-500 text-2xl md:text-3xl font-semibold mb-4">
                Pourquoi Nous Choisir ?
              </h3>
              <ul className="space-y-4">
                <li>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="font-bold text-amber-500">
                      Offre variée :
                    </span>{" "}
                    Découvrez notre sélection unique de livres, papeterie, jeux
                    et cadeaux. Que vous soyez passionné de fiction, de
                    littérature jeunesse, d’organisation créative ou que vous
                    cherchiez un jeu à offrir, vous trouverez forcément ce qu’il
                    vous faut.
                  </p>
                </li>
                <li>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="font-bold text-amber-500">
                      Expérience personnalisée :
                    </span>{" "}
                    Notre équipe passionnée est là pour vous guider, vous
                    conseiller et vous aider à trouver le livre idéal, le cadeau
                    parfait ou les fournitures qui vous inspirent.
                  </p>
                </li>
                <li>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="font-bold text-amber-500">
                      Un esprit communautaire:
                    </span>{" "}
                    Online library, c’est plus qu’une boutique : c’est un lieu
                    de partage. Participez à nos événements, ateliers créatifs,
                    séances de lecture et découvrez une communauté de
                    passionnés.
                  </p>
                </li>
              </ul>
            </div>
            <div className="mb-8">
              <h3 className="text-amber-500 text-2xl md:text-3xl font-semibold mb-4">
                Rejoignez Notre Communauté !
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Nous vous invitons à parcourir notre collection en ligne et à
                découvrir le plaisir de la lecture. Si vous avez des questions
                ou besoin d'assistance, n'hésitez pas à nous contacter !
                Remplissez notre formulaire de contact et connectons-nous. Vous
                pouvez également nous appeler directement via WhatsApp en
                cliquant sur le bouton en bas à droite de votre écran. Votre
                voyage dans le monde des livres commence ici, et nous avons hâte
                d'en faire partie.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                Merci d'avoir choisi{" "}
                <span className="font-bold">Online library</span> . Bonne
                lecture !
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to={"/contact"}
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Restez en Contact &rarr;
        </Link>
      </div>
    </div>
  );
}
