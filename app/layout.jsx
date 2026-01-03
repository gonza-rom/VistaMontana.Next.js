import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export const metadata = {
  title: "Vista Montaña - Hospedaje en Balcozna",
  description: "Alojamientos y turismo en Balcozna, Catamarca. Tu refugio en las sierras con vistas increíbles."
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}