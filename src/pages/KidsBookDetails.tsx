import { Link, useParams } from "react-router-dom";
import Spinner from "../components/ui/Spinner";

import ProductDetails from "../components/product/ProductDetails";
import { FiArrowLeft } from "react-icons/fi";
import { fetchProduct } from "../queries/books";
import { useQuery } from "@tanstack/react-query";

export default function KidsBookDetails() {
  const { title } = useParams();

  const { data: kidsBookData, isLoading: kidsBookLoading } = useQuery({
    queryKey: ["gamesAndGiftsDetails", title],
    queryFn: () => fetchProduct(title!),
    staleTime: 1000 * 60 * 10,
  });
  return (
    <div className=" max-w-5xl mx-auto  text-gray-100 mb-[20px]">
      <h1 className="text-3xl font-bold text-amber-500 text-center mb-12">
        Détails du livre
      </h1>
      {kidsBookData?.product && kidsBookData?.product.quantity === 0 && (
        <h2 className="text-center text-lg text-orange-500  md:w-[60%] mx-auto mb-10">
          Ce produit est actuellement indisponible. Contactez-nous via le{" "}
          <Link to={"/contact"} className="underline">
            formulaire de contact
          </Link>{" "}
          ou par téléphone pour le commander.
        </h2>
      )}
      {kidsBookLoading ? (
        <Spinner />
      ) : (
        <>
          <Link
            to={"/Enfants"}
            className="flex gap-2 items-center mb-4 text-amber-500 underline"
          >
            <FiArrowLeft size={24} />
            <span>Retour</span>
          </Link>
          {kidsBookData?.product && (
            <ProductDetails product={kidsBookData.product} />
          )}
        </>
      )}
    </div>
  );
}
