import { Link, useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  let errorStatus: number;
  let errorStatusText: string;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
  } else {
    errorStatus = 404;
    errorStatusText = "Page non trouvée";
  }
  return (
    <div className="text-center text-xl space-y-2 bg-gray-900 h-screen flex justify-center items-center">
      <div className=" text-3xl p-5 rounded-2xl space-y-4">
        <h2 className="text-red-600">{errorStatus}</h2>
        <p>{errorStatusText}</p>
        <Link to={"/"} replace={true} className="underline ">
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
