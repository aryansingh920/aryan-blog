import Sidebar from "@/app/components/Sidebar";
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
      <body className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-4">{children}</main>
      </body>
    </html>
  );
}
