import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { ScrollToTop } from "../helpers/ScrollToTop";
import WhatsAppButton from "../components/ui/WhatsAppButton";
import MusicContextProvider from "../context/MusicContext";

export default function MainLayout() {
  return (
    <div className="bg-gray-900">
      <div className=" relative text-white">
        <ScrollToTop />
        <WhatsAppButton />
        <MusicContextProvider>
          <Header />
          <main className=" min-h-screen pt-24 pb-8 px-3 md:px-10 max-w-6xl mx-auto">
            <Outlet />
          </main>
        </MusicContextProvider>
        <Footer />
      </div>
    </div>
  );
}
