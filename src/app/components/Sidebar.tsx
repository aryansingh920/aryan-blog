"use client";
//sidebar for desktop devices
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Project, ProjectSection } from "@/types/types";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [projects, setProjects] = useState<ProjectSection[]>([]);
  const [shuffledProjects, setShuffledProjects] = useState<ProjectSection[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIsCollapsed(false);
    // Fetch the projects JSON file
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  useEffect(() => {
    const sP = projects.sort(() => {
      const today = new Date();
      const seed =
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate();
      // const seed = 20241225; // Example of a fixed seed for debugging

      // A simple seeded random number generator function
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000;
        return x - Math.floor(x);
      };

      // Use the seed and index to generate randomness
      const randomValueA = seededRandom(seed + projects.indexOf(projects[0]));
      const randomValueB = seededRandom(seed + projects.indexOf(projects[1]));

      return randomValueA - randomValueB;
    });
    setShuffledProjects(sP);
  }, [projects]);

  // Filter sections and projects based on search term
  const filteredProjects = shuffledProjects
    .map((section) => {
      const filteredItems = section.projects.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...section, projects: filteredItems };
    })
    // Filter out entire sections that have no matching projects
    .filter((section) => section.projects.length > 0);

  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-80"
      } bg-gray-800 text-white fixed top-0 left-0 h-screen transition-all duration-300 flex flex-col`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-between p-4">
        <span className={`text-lg font-bold ${isCollapsed && "hidden"}`}>
          <Link href="/">
            🏠 <u>Home</u>
          </Link>
        </span>
        {/* <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-white focus:outline-none"
        >
          {isCollapsed ? "→" : "←"}
        </button> */}
      </div>

      {/* If sidebar is not collapsed, display search bar and filtered results */}
      {!isCollapsed ? (
        <nav className="flex-1 px-4 space-y-4 overflow-y-auto">
          {/* Search Bar */}
          <div>
            <input
              type="text"
              placeholder="Search by name"
              className="w-full mt-1 px-2 py-1 rounded bg-gray-700 text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Render filtered sections and projects */}
          {filteredProjects.map((section: ProjectSection) => (
            <div key={section.heading}>
              <h2 className="text-sm font-semibold uppercase text-gray-400 mt-4">
                {section.heading.replace("-", " ")}
              </h2>
              <ul className="space-y-1 mt-2">
                {section.projects.map((project: Project) => (
                  <li key={project.id}>
                    <Link
                      href={`/blog/${project.name}`}
                      className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                      {project.name.replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      ) : (
        <nav className="flex-1 px-4 space-y-4 overflow-y-auto">
          <h1>🏠</h1>
        </nav>
      )}
    </div>
  );
}
