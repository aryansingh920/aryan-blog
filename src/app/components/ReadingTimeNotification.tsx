"use client";

import React, { useEffect, useState } from "react";

type ReadingTimeNotificationProps = {
  htmlContent: string;
};

function calculateReadingTime(
  htmlContent: string,
  wordsPerMinute = 260
): number {
  const text =
    new DOMParser().parseFromString(htmlContent, "text/html").body
      .textContent || "";
  const words = text.split(/\s+/).filter((word) => word.trim() !== "");
  const readingTimeMinutes = Math.ceil(words.length / wordsPerMinute);
  return Math.max(readingTimeMinutes, 1);
}

const ReadingTimeNotification: React.FC<ReadingTimeNotificationProps> = ({
  htmlContent,
}) => {
  const [showNotification, setShowNotification] = useState(true);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    // Calculate reading time on the client
    const time = calculateReadingTime(htmlContent);
    setReadingTime(time);

    // Hide notification after 4-5 seconds
    const timer = setTimeout(() => setShowNotification(false), 8000);

    return () => clearTimeout(timer); // Cleanup
  }, [htmlContent]);

  if (!showNotification) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "40px",
        right: "20px",
        background: "#333",
        color: "#fff",
        padding: "10px 15px",
        borderRadius: "5px",
        fontSize: "14px",
        zIndex: 1000,
        opacity: 0.9,
      }}
    >
      ~{readingTime} min read
    </div>
  );
};

export default ReadingTimeNotification;
