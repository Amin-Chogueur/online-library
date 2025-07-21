import { Link, useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { useEffect } from "react";

import { fetchKidsBook } from "../store/slices/kidsBook/kidsBookThunk";
import ProductDetails from "../components/product/ProductDetails";
import { FiArrowLeft } from "react-icons/fi";

export default function KidsBookDetails() {
  const dispatch = useAppDispatch();
  const { title } = useParams();
  const { KidsBook: book, kidsBookLoading } = useAppSelector(
    (state) => state.kidsBook
  );

  useEffect(() => {
    dispatch(fetchKidsBook(title as string));
  }, [dispatch, title]);
  return (
    <div className=" max-w-5xl mx-auto  text-gray-100 mb-[20px]">
      <h1 className="text-3xl font-bold text-amber-500 text-center mb-12">
        Détails du livre
      </h1>
      {book && book.quantity === 0 && (
        <h2 className="text-center text-lg text-orange-500  md:w-[60%] mx-auto mb-10">
          Ce livre est actuellement indisponible. Contactez-nous via le{" "}
          <Link to={"/contact"} className="underline">
            formulaire de contact
          </Link>{" "}
          ou par téléphone pour le commander.
        </h2>
      )}
      {kidsBookLoading === "pending" ? (
        <Spinner />
      ) : (
        <>
          <Link
            to={"/Enfance"}
            className="flex gap-2 items-center mb-4 text-amber-500 underline"
          >
            <FiArrowLeft size={24} />
            <span>Retour</span>
          </Link>
          {book && <ProductDetails product={book} />}
        </>
      )}
    </div>
  );
}
