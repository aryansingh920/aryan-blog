"use client";
// sidebar for desktop devices
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { Project, ProjectSection } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "@/store/slices/projectsSlice";
import type { RootState, AppDispatch } from "@/store";

import BackgroundMusicPlayer from "@/app/components/BackgroundMusicPlayer"; // Import the music player component

export default function Sidebar() {
  const dispatch = useDispatch<AppDispatch>();

  const {
    sections: reduxSections,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state: RootState) => state.projects);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [projects, setProjects] = useState<ProjectSection[]>([]);
  const [shuffledProjects, setShuffledProjects] = useState<ProjectSection[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); // State for music play/pause

  // Dispatch the fetch action on mount
  useEffect(() => {
    setIsCollapsed(false);
    dispatch(fetchProjects());
  }, [dispatch]);

  // Update local 'projects' state when Redux sections change
  useEffect(() => {
    if (!reduxLoading && !reduxError && reduxSections.length > 0) {
      setProjects(reduxSections);
    }
  }, [reduxSections, reduxLoading, reduxError]);

  useEffect(() => {
    if (projects.length === 0) return;

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

  // Play/pause music handler
  const handleMusicToggle = () => {
    setIsPlaying((prev) => !prev); // Toggle play state
  };

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
        {/* Music play/pause button */}
        <button
          onClick={handleMusicToggle}
          className="ml-4 px-3 py-1 bg-gray-700 rounded hover:bg-gray-600 focus:outline-none"
        >
          {isPlaying ? "⏸ Pause Music" : "▶️ Play Music"}
        </button>
      </div>

      {/* Include BackgroundMusicPlayer */}
      <BackgroundMusicPlayer isPlaying={isPlaying} />

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
              <hr />
              <h2 className="text-sm font-semibold uppercase text-gray-400 mt">
                <Link
                  href={`/section/${section.heading
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="block px-4 py-2 rounded hover:bg-gray-700"
                >
                  ▹&nbsp; {section.heading.replace("-", " ")}
                </Link>
              </h2>
              <hr />
              <ul className="space-y-1 mt-2">
                {section.projects.map((project: Project) => (
                  <li key={project.id}>
                    <Link
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
        </nav>
      ) : (
        <nav className="flex-1 px-4 space-y-4 overflow-y-auto">
          <h1>🏠</h1>
        </nav>
      )}
    </div>
  );
}
