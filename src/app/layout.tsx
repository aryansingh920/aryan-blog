import "@/styles/globals.css";
import { Providers } from "./providers";
import DynamicLayout from "@/app/components/DynamicLayout";

export const metadata = {
  title: "Aryan's Blog",
  description:
    "Explore Aryan's insights on technology, science, and personal growth. Delve into topics like data science, quantum computing, machine learning, and philosophical musings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        {/* Removed MathJax scripts from RootLayout */}
      </head>
      <body
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(237,237,237,1) 35%, rgba(189,189,189,1) 100%)",
        }}
        className="h-screen"
      >
        <Providers>
          <div style={{ overflowY: "auto" }}>
            <DynamicLayout>{children}</DynamicLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
