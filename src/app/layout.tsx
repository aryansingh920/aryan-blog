import DynamicLayout from "@/app/components/DynamicLayout";
import "@/styles/globals.css";
// import { background } from "../../public/background.gif";
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

        {/* <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/uikit@3.22.0/dist/css/uikit.min.css"
        /> */}
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
        {/* <script src="https://cdn.jsdelivr.net/npm/uikit@3.22.0/dist/js/uikit.min.js"></script> */}
        {/* <script src="https://cdn.jsdelivr.net/npm/uikit@3.22.0/dist/js/uikit-icons.min.js"></script> */}
      </body>
    </html>
  );
}
