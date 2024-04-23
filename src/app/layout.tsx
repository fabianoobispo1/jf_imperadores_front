import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import HeaderV2 from "@/components/HeaderV2";

export const metadata = {
  title: "Jf Imperadores",
  description: "Pagina para gerenciamento do time de Futebol Americano.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">      
      <body>
        {/* <HeaderV2 /> */}
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
