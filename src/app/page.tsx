"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import seedrandom from "seedrandom";
import Link from "next/link";
import { Pagination } from "@nextui-org/react"; // Import Pagination

import { Project, ProjectSection } from "@/types/types";
import AboutMe from "./components/AboutMe";
import Card from "./components/Card";
import PageHeader from "./components/PageHeader";
import { fetchProjects } from "@/store/slices/projectsSlice";

// Import the types for Redux hooks
import type { RootState, AppDispatch } from "@/store";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen loaderBg">
      <div className="loader w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
      <style jsx>{`
        .loader {
          border-top-color: #3498db;
          border-right-color: #3498db;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingState, setLoadingState] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7; // Adjust this number as needed

  const dispatch = useDispatch<AppDispatch>();
  const {
    sections: reduxSections,
    loading: reduxLoading,
    error: reduxError,
  } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (reduxLoading) {
      setLoadingState(true);
      return;
    }

    if (reduxError) {
      console.error("Error fetching projects from Redux.");
      setLoadingState(false);
      return;
    }

    if (reduxSections.length > 0) {
      const enrichedProjects = reduxSections.flatMap(
        (section: ProjectSection) =>
          section.projects.map((project) => ({
            ...project,
            heading: section.heading,
          }))
      );

      const sortedProjects = enrichedProjects.sort((a, b) => {
        const dateA = new Date(
          a.addedOn.date.split("/").reverse().join("-") + " " + a.addedOn.time
        );
        const dateB = new Date(
          b.addedOn.date.split("/").reverse().join("-") + " " + b.addedOn.time
        );
        return dateB.getTime() - dateA.getTime();
      });

      const today = new Date().toISOString().split("T")[0];
      const rng = seedrandom(today);

      for (let i = sortedProjects.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [sortedProjects[i], sortedProjects[j]] = [
          sortedProjects[j],
          sortedProjects[i],
        ];
      }

      setProjects(sortedProjects);
      setLoadingState(false);
    } else {
      setProjects([]);
      setLoadingState(false);
    }
  }, [reduxSections, reduxLoading, reduxError]);

  useEffect(() => {
    if (projects.length > 0) {
      const sP = [...projects].sort(() => {
        const today = new Date();
        const seed =
          today.getFullYear() * 10000 +
          (today.getMonth() + 1) * 100 +
          today.getDate();

        const seededRandom = (seed: number) => {
          const x = Math.sin(seed) * 10000;
          return x - Math.floor(x);
        };

        const randomValueA = seededRandom(seed + projects.indexOf(projects[0]));
        const randomValueB = seededRandom(seed + projects.indexOf(projects[1]));

        return randomValueA - randomValueB;
      });
      setShuffledProjects(sP);
    }
  }, [projects]);

  if (loadingState) {
    return <Loader />;
  }

  // Pagination logic: determine the projects to show on the current page.
  const totalPages = Math.ceil(shuffledProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = shuffledProjects
    .slice()
    .reverse()
    .slice(startIndex, startIndex + itemsPerPage);

  return (
    <main
      className={
        isMobile
          ? "m-3 min-h-screen mainPage"
          : "pl-6 pt-6 min-h-screen mainPage"
      }
    >
      <section>
        <PageHeader
          sectionName="All my projects"
          projects={projects}
          isMobile={isMobile}
        />

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProjects.map((project, index) => (
            <Card isMobile={isMobile} key={index} project={project} />
          ))}
        </div>

        {/* Render Pagination component below the grid */}
        <div className="flex justify-center mt-6">
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={(page) => setCurrentPage(page)}
            initialPage={1}
          />
        </div>
      </section>

      <section>
        <Link href="#about">
          <AboutMe isMobile={isMobile} />
        </Link>
      </section>
    </main>
  );
}
