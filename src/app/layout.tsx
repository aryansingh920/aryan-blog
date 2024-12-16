import DynamicLayout from "@/app/components/DynamicLayout";
import "@/styles/globals.css";

export const metadata = {
  title: "Aryan's Blog",
  description: "Aryan's blog page",
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
      <body
        style={{ backgroundImage: "url('./background.jpg')" }}
        className="h-screen"
      >
        <DynamicLayout>{children}</DynamicLayout>
      </body>
    </html>
  );
}
