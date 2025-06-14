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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="/books" replace /> },
      { path: "books", element: <Books /> },
      {
        path: "books/:title",
        element: <BookDetail />,
        // Add this if you need to access the params later
        loader: ({ params }) => {
          return { title: params.title };
        },
      },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "cart", element: <Cart /> },
      // Add a catch-all route for 404s that might slip through
      { path: "*", element: <ErrorPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
