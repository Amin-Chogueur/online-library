export default function NoProductFound() {
  return (
    <div className="flex flex-col items-center justify-center p-8 rounded-lg bg-gray-900 border border-gray-700 shadow-lg max-w-md mx-auto my-10">
      <svg
        className="w-16 h-16 text-amber-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
      <h3 className="text-xl font-semibold text-gray-100 mb-2 text-center">
        Aucun produit trouvé
      </h3>
    </div>
  );
}
