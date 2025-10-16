import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import Books from "./pages/Books";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Favorites from "./pages/Favorites";
import Success from "./pages/Success";
import KidsBooks from "./pages/KidsBooks";
import Home from "./pages/Home";
import GamesAndGifts from "./pages/GamesAndGifts";
import Stationery from "./pages/Stationery";
import React, { Suspense } from "react";
import Spinner from "./components/ui/Spinner"; // Lazy imports
const BookDetails = React.lazy(() => import("./pages/BookDetails"));
const KidsBookDetails = React.lazy(() => import("./pages/KidsBookDetails"));
const GamesAndGiftsDetails = React.lazy(
  () => import("./pages/GamesAndGiftsDetails")
);
const StationeryDetails = React.lazy(() => import("./pages/StationeryDetails"));
const FavoritesDetails = React.lazy(() => import("./pages/FavoritesDetails"));

// Wrapper for Suspense
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "Nos_Livres",
        element: <Books />,
      },
      { path: "Nos_Livres/:title", element: withSuspense(BookDetails) },
      { path: "Enfants", element: <KidsBooks /> },
      { path: "Enfants/:title", element: withSuspense(KidsBookDetails) },
      { path: "Jeux-Cadeaux", element: <GamesAndGifts /> },
      {
        path: "Jeux-Cadeaux/:title",
        element: withSuspense(GamesAndGiftsDetails),
      },
      { path: "Papeterie", element: <Stationery /> },
      { path: "Papeterie/:title", element: withSuspense(StationeryDetails) },
      { path: "À_propos", element: <About /> },
      { path: "Contact", element: <Contact /> },
      { path: "Panier", element: <Cart /> },
      { path: "Mes_favoris", element: <Favorites /> },
      { path: "Mes_favoris/:title", element: withSuspense(FavoritesDetails) },
      { path: "succès", element: <Success /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
