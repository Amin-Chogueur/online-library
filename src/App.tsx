import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import Books from "./pages/Books";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import BookDetails from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import Success from "./pages/Success";
import KidsBooks from "./pages/KidsBooks";
import KidsBookDetails from "./pages/KidsBookDetails";
import Home from "./pages/Home";
import GamesAndGifts from "./pages/GamesAndGifts";
import Stationery from "./pages/Stationery";
import GamesAndGiftsDetails from "./pages/GamesAndGiftsDetails";
import FavoritesDetails from "./pages/FavoritesDetails";
import StationeryDetails from "./pages/StationeryDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "Nos_Livres", element: <Books /> },
      { path: "Nos_Livres/:title", element: <BookDetails /> },
      { path: "Enfance", element: <KidsBooks /> },
      { path: "Enfance/:title", element: <KidsBookDetails /> },
      { path: "Jeux-Cadeaux", element: <GamesAndGifts /> },
      { path: "Jeux-Cadeaux/:title", element: <GamesAndGiftsDetails /> },
      { path: "Papeterie", element: <Stationery /> },
      { path: "Papeterie/:title", element: <StationeryDetails /> },
      { path: "À_propos", element: <About /> },
      { path: "Contact", element: <Contact /> },
      { path: "Panier", element: <Cart /> },
      { path: "Mes_favoris", element: <Favorites /> },
      { path: "Mes_favoris/:title", element: <FavoritesDetails /> },
      { path: "succès", element: <Success /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
