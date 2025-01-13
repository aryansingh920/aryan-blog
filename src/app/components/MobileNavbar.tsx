"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";


import { Project, ProjectSection } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "@/store/slices/projectsSlice";
import type { RootState, AppDispatch } from "@/store";

export default function MobileNavbar() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    sections: reduxSections,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state: RootState) => state.projects);

  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<ProjectSection[]>([]);
  const [shuffledProjects, setShuffledProjects] = useState<ProjectSection[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Dispatch the Redux action to fetch projects on mount
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    // Update local 'projects' state when Redux data is ready
    if (!reduxLoading && !reduxError && reduxSections.length > 0) {
      setProjects(reduxSections);
    }
  }, [reduxSections, reduxLoading, reduxError]);

  useEffect(() => {
    if (projects.length === 0) return;

    // Clone the array to avoid in-place mutation during sort
    const projectsClone = [...projects];

    const sP = projectsClone.sort(() => {
      const today = new Date();
      const seed =
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate();

      const seededRandom = (seedVal: number) => {
        const x = Math.sin(seedVal) * 10000;
        return x - Math.floor(x);
      };

      // Use the seed and index to generate randomness
      const randomValueA = seededRandom(
        seed + projectsClone.indexOf(projectsClone[0])
      );
      const randomValueB = seededRandom(
        seed + projectsClone.indexOf(projectsClone[1])
      );

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
    .filter((section) => section.projects.length > 0);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
      className="bg-gray-800 text-white opacity-90"
    >
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
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by name"
              className="w-full px-2 py-1 rounded bg-gray-700 
                         text-white placeholder-gray-400 
                         focus:outline-none focus:ring-2 
                         focus:ring-gray-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Render filtered sections and projects */}
          {filteredProjects.map((section: ProjectSection) => (
            <div key={section.heading} className="mb-4">
              <hr />
              <Link
                onClick={() => setIsOpen(false)}
                href={`/section/${section.heading.toLowerCase()}`}
              >
                <h2 className="text-sm font-semibold uppercase text-gray-400 mt-1 mb-1 hover:bg-gray-700">
                  ▹&nbsp;{section.heading.replace("-", " ")}
                </h2>
              </Link>
              <hr />

              {/* Projects */}
              <ul className="space-y-1">
                {section.projects.map((project: Project) => (
                  <li key={project.id}>
                    <Link
                      onClick={() => setIsOpen(false)}
                      href={`/blog/${project.name}`}
                      className="block px-4 py-2 rounded hover:bg-gray-700"
                    >
                      ⚬ &nbsp; {project.name.replace(/-/g, " ")}
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
