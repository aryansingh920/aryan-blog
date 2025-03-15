"use client";

import React from "react";
import FooterSection from "./FooterSection";

export default function Footer({ isMobile }: { isMobile: boolean }) {
  return (
    <>
      <FooterSection isMobile={isMobile} />
      <footer
        style={{
          marginBottom: isMobile ? "5px" : "0",
        }}
        className="bg-gray-900 text-gray-300 py-1"
      >
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          {/* Left Section: Name and Portfolio */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-semibold text-white">
              Aryan Singh`s Portfolio
            </h2>
            <a
              href="https://aryansingh.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              aryansingh.space
            </a>
          </div>

          {/* Center Section: Socials */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://github.com/aryansingh920"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <i className="fab fa-github"></i> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/aryan-singh-axone125/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a
              href="mailto:contact.aryansingh920@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <i className="fas fa-envelope"></i> Email
            </a>
          </div>

          {/* Right Section: Contact */}
          <div className="text-center md:text-right">
            <p>Contact me:</p>
            <a
              href="mailto:contact.aryansingh920gmail.com"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              contact.aryansingh920gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-4 text-sm">
          © {new Date().getFullYear()} Aryan Singh. All rights reserved.
        </div>
      </footer>
    </>
  );
}
