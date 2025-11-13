import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// Load fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata (unchanged)
export const metadata = {
  title: "Gemini Chatbot",
  description: "An interactive chatbot built with Next.js and Gemini API",
};

// Layout Component
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          color: "#333",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          fontFamily: "var(--font-geist-sans)",
        }}
      >
        {/* Header */}
        <header
          style={{
            width: "100%",
            padding: "16px 24px",
            backgroundColor: "rgba(255,255,255,0.7)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "600",
              margin: 0,
              textAlign: "center",
              letterSpacing: "0.5px",
            }}
          >
            💬 Gemini Chatbot
          </h1>
        </header>

        {/* Main App Content */}
        <main
          style={{
            flex: 1,
            width: "100%",
            maxWidth: "800px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          {children}
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: "10px",
            fontSize: "13px",
            color: "#555",
            textAlign: "center",
            borderTop: "1px solid rgba(0,0,0,0.1)",
            width: "100%",
            backgroundColor: "rgba(255,255,255,0.6)",
          }}
        >
          © {new Date().getFullYear()} Gemini Chatbot · Built with Next.js
        </footer>
      </body>
    </html>
  );
}
