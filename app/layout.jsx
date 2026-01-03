import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Script from "next/script";

export const metadata = {
  title: "Vista Montaña - Hospedaje en Balcozna",
  description: "Alojamientos y turismo en Balcozna, Catamarca. Tu refugio en las sierras con vistas increíbles.",
  keywords: "hospedaje, balcozna, catamarca, alojamiento, turismo, sierras, el saltón, montaña",
  authors: [{ name: "Vista Montaña" }],
  openGraph: {
    title: "Vista Montaña - Hospedaje en Balcozna",
    description: "Tu refugio en las sierras de Catamarca. Alojamiento cómodo cerca de El Saltón.",
    url: "https://vistamontanas.netlify.app/",
    siteName: "Vista Montaña",
    images: [
      {
        url: "/logo-vistamontana.png",
        width: 800,
        height: 800,
        alt: "Hospedaje Vista Montaña",
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vista Montaña - Hospedaje en Balcozna",
    description: "Tu refugio en las sierras de Catamarca",
    images: ["/logo-vistamontana.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png" },
    ],
  },
};


export default function RootLayout({ children }) {
  const GTM_ID = 'GTM-NRXTQFF3';

  return (
    <html lang="es">
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        
        {/* Google Tag Manager - HEAD */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        {/* Google Tag Manager (noscript) - BODY */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

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