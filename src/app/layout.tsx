import DynamicLayout from "@/app/components/DynamicLayout";
import "@/styles/globals.css";
// import { background } from "../../public/background.gif";
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
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(237,237,237,1) 35%, rgba(189,189,189,1) 100%)",
        }}
        className="h-screen"
      >
        <div
          style={{
            overflowY: "auto",
          }}
        >
          <DynamicLayout>{children}</DynamicLayout>
        </div>
      </body>
    </html>
  );
}
