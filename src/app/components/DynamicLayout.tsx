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
  const [isMobile, setIsMobile] = useState(true);
  const [noSidebar, setNoSidebar] = useState(false);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

useEffect(() => {
  if (typeof window !== "undefined") {
    const starfield = document.getElementById("starfield");
    if (starfield) {
      const numberOfStars = 2000;
      console.log("Starfield found, adding stars...");
      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement("div");
        star.className = "star";

        // Random positions and animation settings
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        star.style.animationDuration = Math.random() * 5 + 3 + "s";
        star.style.animationDelay = Math.random() * -5 + "s";

        starfield.appendChild(star);
      }
    } else {
      console.error("Starfield element not found.");
    }
  }
}, []);

useEffect(() => {
  if (window.location.search.includes("noSidebar")) {
    setNoSidebar(true);
  }
}, []);

return (
  <div className="relative h-screen">
    {/* Starfield Background */}
    <div
      id="starfield"
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        perspective: "1200px",
        zIndex: 1,
      }}
    ></div>

    {/* Styles for Stars */}
    <style>
      {`
        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: black;
          border-radius: 50%;
          animation: moveStar linear infinite;
        }

        @keyframes moveStar {
          0% {
            transform: translateZ(-800px) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateZ(0px) scale(5);
            opacity: 0;
          }
        }
        `}
    </style>

    {/* Mobile or Desktop Layout */}
    <div className="flex h-screen relative z-10">
      {isMobile ? (
        <div className="w-full">
          {!noSidebar && <MobileNavbar />}
          <div className="flex-1 overflow-y-auto p-0">
            {children}
            <Footer isMobile={isMobile} />
          </div>
        </div>
      ) : (
        <>
          {!noSidebar && <Sidebar />}
          <div
            className={`flex-1 overflow-y-auto ${
              !noSidebar && "ml-80"
            } flex flex-col`}
          >
            <div className="flex-1">{children}</div>

            {!noSidebar && <Footer isMobile={isMobile} />}
          </div>
        </>
      )}
    </div>
  </div>
);
}
