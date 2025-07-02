import { useState, type FormEvent } from "react";
import { FiSearch } from "react-icons/fi";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { fetchBooks } from "../../store/slices/book/bookThunk";

export default function SearchBook() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  function handleSearch(e: FormEvent) {
    e.preventDefault();
    if (search.trim() === "") return;
    const title = search.replace(/ /g, "_");
    dispatch(fetchBooks({ page: 1, selectedCategory: " ", title }));
  }
  return (
    <form onSubmit={handleSearch} className="relative w-[300px] mb-6 mx-auto">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        placeholder="	Taper le titre du livre..."
        className="w-full p-3 rounded-lg bg-zinc-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      />
      <button className="absolute top-1/2 right-0 -translate-y-1/2 text-zinc-100 cursor-pointer bg-amber-600 h-full w-[25px] flex justify-center items-center rounded-br-lg rounded-tr-lg">
        <FiSearch />
      </button>
    </form>
  );
}
