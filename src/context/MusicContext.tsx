import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";

type MusicContextType = {
  handlePlayMusic: () => void;
};

export const MusicContext = createContext<MusicContextType | null>(null);

export default function MusicContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [showAudioControllers, setShowAudioControllers] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const handlePlayMusic = () => {
    audioRef.current?.play();
  };
  return (
    <MusicContext.Provider value={{ handlePlayMusic }}>
      <div className="fixed top-[90px] left-[20px] z-50 flex  gap-2">
        <span
          className="cursor-pointer p-1"
          onClick={() => setShowAudioControllers((prev) => !prev)}
        >
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 1024 1024"
            className="bg-orange-600 rounded text-3xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M892.1 737.8l-110.3-63.7a15.9 15.9 0 0 0-21.7 5.9l-19.9 34.5c-4.4 7.6-1.8 17.4 5.8 21.8L856.3 800a15.9 15.9 0 0 0 21.7-5.9l19.9-34.5c4.4-7.6 1.7-17.4-5.8-21.8zM760 344a15.9 15.9 0 0 0 21.7 5.9L892 286.2c7.6-4.4 10.2-14.2 5.8-21.8L878 230a15.9 15.9 0 0 0-21.7-5.9L746 287.8a15.99 15.99 0 0 0-5.8 21.8L760 344zm174 132H806c-8.8 0-16 7.2-16 16v40c0 8.8 7.2 16 16 16h128c8.8 0 16-7.2 16-16v-40c0-8.8-7.2-16-16-16zM625.9 115c-5.9 0-11.9 1.6-17.4 5.3L254 352H90c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h164l354.5 231.7c5.5 3.6 11.6 5.3 17.4 5.3 16.7 0 32.1-13.3 32.1-32.1V147.1c0-18.8-15.4-32.1-32.1-32.1z"></path>
          </svg>
        </span>

        <audio
          ref={audioRef}
          src="/music.mp3"
          loop
          preload="auto"
          controls
          style={{ display: showAudioControllers ? "block" : "none" }}
        />
      </div>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
