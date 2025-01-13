/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import Link from "next/link";
import { Project, ProjectSection } from "@/types/types";
import AboutMe from "./components/AboutMe";
import Card from "./components/Card";

// A simple CSS spinner (spiral-like) - you can customize further via Tailwind or your own CSS
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Spiral/Spinner container */}
      <div className="loader w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>

      {/* If you'd prefer an image or something else, replace the above <div> with:
        <img src="/spinner.gif" alt="Loading..." />
      */}
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
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    const sP = projects.sort(() => {
      const today = new Date();
      const seed =
        today.getFullYear() * 10000 +
        (today.getMonth() + 1) * 100 +
        today.getDate();

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

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data: ProjectSection[]) => {
        // Flatten the projects and include the heading for each project
        const enrichedProjects = data.flatMap((section) =>
          section.projects.map((project) => ({
            ...project,
            heading: section.heading, // Add the heading from the section
          }))
        );

        // Sort the enriched projects in descending order by time and date
        const sortedProjects = enrichedProjects.sort((a, b) => {
          const dateA = new Date(
            a.addedOn.date.split("/").reverse().join("-") + " " + a.addedOn.time
          );
          const dateB = new Date(
            b.addedOn.date.split("/").reverse().join("-") + " " + b.addedOn.time
          );
          return dateB.getTime() - dateA.getTime(); // Descending order
        });

        // Get the seed based on the current date (YYYY-MM-DD)
        const today = new Date().toISOString().split("T")[0];
        // const today = "2024-12-29"; // For testing
        const rng = seedrandom(today);

        // Fisher-Yates shuffle with a seeded random number generator
        for (let i = sortedProjects.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [sortedProjects[i], sortedProjects[j]] = [
            sortedProjects[j],
            sortedProjects[i],
          ];
        }

        setProjects(sortedProjects);
        setLoading(false); // Data loaded, hide the loader
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false); // Even if there's an error, hide loader
      });
  }, []);

  // If still loading, show the Loader
  if (loading) {
    return <Loader />;
  }

  return (
    <main
      className={
        isMobile
          ? "m-3  min-h-screen mainPage"
          : "pl-6 pt-6 min-h-screen mainPage"
      }
    >
      <section>
        <div className="max-w rounded-lg">
          <div className="relative">
            <img
              src="https://media.licdn.com/dms/image/v2/D5616AQF12usVORj44g/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1735963984496?e=1741824000&v=beta&t=0fflCZctRzBVR-E4KWnrM4_yPRVgOW3kZx1MVfgk8B4"
              alt="Banner"
              className="w-full object-cover rounded-t-lg"
            />
          </div>

          <div className="relative flex justify-center">
            <div className="absolute -top-10">
              <img
                src="/profile.jpeg"
                alt="Profile"
                className="w-20 h-20 rounded-full border-4 border-white"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <h1 className="text-3xl font-semibold">{"All my work's"}</h1>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shuffledProjects.reverse().map((project) => (
            <Card key={project.name} project={project} />
          ))}
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
