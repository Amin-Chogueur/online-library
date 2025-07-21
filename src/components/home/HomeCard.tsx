import { Link } from "react-router-dom";
import { useMusic } from "../../context/MusicContext";

// Updated HomeCard component
type HomeCardProps = {
  title: string;
  description: string;
  image: string;
  color: string;
  link: string;
};

export default function HomeCard({ category }: { category: HomeCardProps }) {
  const { handlePlayMusic } = useMusic();
  return (
    <Link
      to={category.link}
      onClick={handlePlayMusic}
      className={`${category.color}  rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col items-center text-center text-white`}
    >
      <div className="mb-4 flex items-center justify-center">
        <div className=" bg-opacity-20  w-full h-[200px]  flex items-center justify-center overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover rounded-tl-xl rounded-tr-xl"
          />
        </div>
      </div>
      <h2 className="text-xl font-bold mb-3">{category.title}</h2>
      <p className="text-sm opacity-90 mb-4 p-4">{category.description}</p>
    </Link>
  );
}
