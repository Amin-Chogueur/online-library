import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); // Triggers when element is
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 ">
      <h1 className="text-amber-600 text-3xl  text-center mb-12 font-bold">
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
            <div>
              <h3 className="text-amber-700 text-2xl md:text-3xl font-semibold mb-4">
                Bienvenue sur Ghiz Read Librairie!
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Chez Ghiz Read Store, nous croyons que chaque livre ouvre une
                nouvelle porte vers l'aventure, le savoir et l'inspiration.
                Notre collection soigneusement sélectionnée propose une large
                gamme de genres, des classiques intemporels aux derniers
                best-sellers, garantissant qu'il y a un livre pour chaque
                lecteur.
              </p>
            </div>
            <div>
              <h3 className="text-amber-700 text-2xl md:text-3xl font-semibold mb-4">
                Pourquoi Nous Choisir ?
              </h3>
              <ul className="space-y-6">
                <li>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="font-bold text-amber-700">
                      Large Sélection :
                    </span>{" "}
                    Découvrez notre vaste choix de livres pour tous les goûts et
                    tous les âges. Que vous soyez fan de fiction, non-fiction,
                    littérature jeunesse, ou développement personnel, nous avons
                    le livre parfait qui vous attend.
                  </p>
                </li>
                <li>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="font-bold text-amber-700">
                      Expérience Personnalisée :
                    </span>{" "}
                    Notre équipe passionnée est dédiée à vous aider à trouver
                    votre prochaine lecture préférée. Nous sommes toujours là
                    pour vous fournir des recommandations adaptées à vos
                    intérêts.
                  </p>
                </li>
                <li>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    <span className="font-bold text-amber-700">
                      Focalisation sur la Communauté :
                    </span>{" "}
                    Nous sommes bien plus qu'une simple librairie ; nous sommes
                    un lieu de rencontre pour les amoureux des livres.
                    Rejoignez-nous pour des événements passionnants, des séances
                    de dédicaces et des groupes de lecture qui favorisent les
                    échanges et enrichissent les discussions.
                  </p>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-amber-700 text-2xl md:text-3xl font-semibold mb-4">
                Rejoignez Notre Communauté !
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Nous vous invitons à parcourir notre collection en ligne et à
                découvrir le plaisir de la lecture. Si vous avez des questions
                ou besoin d'assistance, n'hésitez pas à nous contacter !
                Remplissez notre formulaire de contact et connectons-nous. Votre
                voyage dans le monde des livres commence ici, et nous avons hâte
                d'en faire partie.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mt-4">
                Merci d'avoir choisi Ghiz Read. Bonne lecture !
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to={"/contact"}
          className="inline-block bg-amber-700 hover:bg-amber-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
        >
          Restez en Contact &rarr;
        </Link>
      </div>
    </div>
  );
}
