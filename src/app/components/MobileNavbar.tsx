"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Project, ProjectSection } from "@/types/types";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectSection[]>([]);

  useEffect(() => {
    // Fetch the projects JSON file
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      {/* Navbar Header */}
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-bold">
          <Link href="/">
            🏠 <u>Home</u>
          </Link>
        </h1>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Collapsible Menu */}
      {isOpen && (
        <div className="bg-gray-900 p-4">
          {/* Render Headings and Projects */}
          {projects
            .sort(() => Math.random() - 0.5)
            .map((section: ProjectSection) => (
              <div key={section.heading} className="mb-4">
                {/* Heading */}
                <h2 className="text-sm font-semibold uppercase text-gray-400 mb-2">
                  {section.heading.replace("-", " ")}
                </h2>

                {/* Projects */}
                <ul className="space-y-1">
                  {section.projects
                    .sort(() => Math.random() - 0.5)
                    .map((project: Project) => (
                      <li key={project.id}>
                        <Link
                          href={`/blog/${project.name}`}
                          className="block px-4 py-2 rounded hover:bg-gray-700"
                        >
                          {project.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </nav>
  );
}
