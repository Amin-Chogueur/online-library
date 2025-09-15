// loaders/booksLoader.ts
import { store } from "../store/store";
import { fetchBooks } from "../store/slices/book/bookThunk";
import { fetchCategories } from "../store/slices/subCategory/subCategoryThunk";
import type { LoaderFunctionArgs } from "react-router-dom";

export async function booksLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const selectedSubCategory = url.searchParams.get("Category") || "All";
  const productStatus = url.searchParams.get("statut") || undefined;

  await store.dispatch(fetchCategories("Romans"));
  await store.dispatch(
    fetchBooks({ page, selectedSubCategory, productStatus })
  );

  return null;
}
