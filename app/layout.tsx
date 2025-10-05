import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "../styles/globals.scss"

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: "Mastercard",
  description: "Mastercard - Customer Stories",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        {children}
      </body>
    </html>
  );
}
