import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ErrorPage from "./pages/ErrorPage";
import Books from "./pages/Books";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import BookDetail from "./pages/BookDetails";
import Favorites from "./pages/Favorites";
import Success from "./pages/Success";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="Nos_Livres" replace /> },
      { path: "Nos_Livres", element: <Books /> },
      {
        path: "Nos_Livres/:title",
        element: <BookDetail />,
      },
      { path: "À_propos", element: <About /> },
      { path: "Contact", element: <Contact /> },
      { path: "Panier", element: <Cart /> },
      { path: "Mes_favoris", element: <Favorites /> },
      { path: "succès", element: <Success /> },
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
