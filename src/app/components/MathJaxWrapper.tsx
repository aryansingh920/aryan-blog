"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    MathJax?: {
      typesetPromise?: (elements?: HTMLElement[]) => Promise<void>;
      startup?: {
        promise: Promise<void>;
      };
    };
  }
}

export default function MathJaxWrapper({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMathJaxLoaded, setIsMathJaxLoaded] = useState(false);

  // Function to handle MathJax typesetting
  const handleTypeset = async () => {
    if (window.MathJax?.typesetPromise && containerRef.current) {
      try {
        await window.MathJax.typesetPromise([containerRef.current]);
        console.log("MathJax typesetting complete");
      } catch (err) {
        console.error("MathJax typeset failed:", err);
      }
    } else {
      console.warn("MathJax is not loaded or typesetPromise is unavailable.");
    }
  };

  // Effect to trigger typeset when MathJax is loaded or children change
  useEffect(() => {
    if (isMathJaxLoaded) {
      handleTypeset();
    }
  }, [isMathJaxLoaded, children]);

  return (
    <>
      {/* MathJax Configuration */}
      <Script id="MathJax-config" strategy="beforeInteractive">
        {`
          window.MathJax = {
            tex: {
            //   inlineMath: [["\\(", "\\)"]],
            //   displayMath: [["$$", "$$"]]
            },
            svg: {
              fontCache: "global"
            }
          };
        `}
      </Script>

      {/* MathJax Library */}
      <Script
        src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js"
        strategy="afterInteractive"
        onLoad={() => {
          setIsMathJaxLoaded(true);
        }}
      />

      {/* Content Container */}
      <div ref={containerRef}>{children}</div>
    </>
  );
}
