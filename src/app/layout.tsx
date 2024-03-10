import { Toaster } from "react-hot-toast";
import "./globals.css";

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
        <Toaster />
      </body>
    </html>
  );
}
