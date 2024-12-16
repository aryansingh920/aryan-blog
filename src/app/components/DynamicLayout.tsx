"use client";

import { useState, useEffect } from "react";
import MobileNavbar from "@/app/components/MobileNavbar";
import Sidebar from "@/app/components/Sidebar";
import Footer from "@/app/components/Footer";

export default function DynamicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  return (
    <div className="flex h-screen">
      {/* Mobile View: Navbar */}
      {isMobile ? (
        <div className="w-full">
          <MobileNavbar />
          <div className="flex-1 overflow-y-auto p-0">
            {children}
            <Footer />
          </div>
        </div>
      ) : (
        /* Desktop View: Sidebar + Main Content */
        <>
          <Sidebar />
          <div className="flex-1 overflow-y-auto p-6 ml-80 flex flex-col">
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </>
      )}
    </div>
  );
}
