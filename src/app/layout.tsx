import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Jf Imperadores",
  description: "Pagina para gerenciamento do time de futibol americano.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">      
      <body>
        {children}
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
