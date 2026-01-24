import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Eco-Lens | Real-time Environment Tracker and Sustainability Metrics",
  description:
    "Monitor real-time environmental data across the globe. Powered by REST Countries and OpenWeather, this app's focus is to give real-time environment data of each country and even in its chosen provinces.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#f0fdf4]" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('user-theme') || 'day';
                  document.documentElement.setAttribute('data-theme', saved);
                  if (saved === 'day') {
                    document.documentElement.classList.add('day');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-background text-foreground transition-colors duration-500`}>
        <ThemeProvider>
          <Navbar />
          <ThemeToggle />
          <main className="pt-18 min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}