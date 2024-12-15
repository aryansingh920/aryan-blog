import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer"; // Import the Footer component
import "@/styles/globals.css";

export const metadata = {
  title: "Project Blog",
  description: "A blog page with dynamic routing and sidebar",
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
      </head>
      <body className="flex h-screen">
        {/* Sidebar fixed */}
        <Sidebar />

        {/* Scrollable main content with footer */}
        <main className="flex-1 overflow-y-auto p-6 ml-80 flex flex-col">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
