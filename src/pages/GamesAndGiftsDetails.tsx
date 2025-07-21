import { Link, useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";

import { fetchGameAndGift } from "../store/slices/gamesAndGifts/gamesAndGiftsThunk";
import ProductDetails from "../components/product/ProductDetails";
import { FiArrowLeft } from "react-icons/fi";

export default function GamesAndGiftsDetails() {
  const dispatch = useAppDispatch();
  const { title } = useParams();
  const { gameAndGift: product, gamesAndGiftsLoading } = useAppSelector(
    (state) => state.gamesAndGifts
  );

  useEffect(() => {
    dispatch(fetchGameAndGift(title as string));
  }, [dispatch, title]);
  return (
    <div className=" max-w-5xl mx-auto  text-gray-100 mb-[20px]">
      <h1 className="text-3xl font-bold text-amber-500 text-center mb-12">
        Détails de l’article
      </h1>
      {product && product.quantity === 0 && (
        <h2 className="text-center text-lg text-orange-500  md:w-[60%] mx-auto mb-10">
          Ce livre est actuellement indisponible. Contactez-nous via le{" "}
          <Link to={"/contact"} className="underline">
            formulaire de contact
          </Link>{" "}
          ou par téléphone pour le commander.
        </h2>
      )}
      {gamesAndGiftsLoading === "pending" ? (
        <Spinner />
      ) : (
        <>
          <Link
            to={"/Jeux-Cadeaux"}
            className="flex gap-2 items-center mb-4 text-amber-500 underline"
          >
            <FiArrowLeft size={24} />
            <span>Retour</span>
          </Link>
          {product && <ProductDetails product={product} />}
        </>
      )}
    </div>
  );
}
