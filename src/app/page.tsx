"use client";

import { useEffect, useState } from "react";
import seedrandom from "seedrandom";
import Link from "next/link";
import { Project, ProjectSection } from "@/types/types";
// import Carousel from "./components/Caraousel";
import AboutMe from "./components/AboutMe";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);
  // const [iframeSources, setIframeSources] = useState<string[]>([]);

  // const iframeSources = [
  //   "https://www.youtube.com/embed/dQw4w9WgXcQ",
  //   "https://www.youtube.com/embed/oHg5SJYRHA0",
  //   "https://www.youtube.com/embed/kJQP7kiw5Fk",
  // ];

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
      // const seed = 20241225;

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

    // const links = sP
    // .map((project) => `blog/${project.name}?noSidebar`)
    // .reverse()
    // .slice(0, 5);
    // console.log(links);
    // setIframeSources(shuffledProjects.slice(0, 3));
    // setIframeSources(links);
  }, [projects, shuffledProjects]);

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
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
        // const today = "2024-12-29";
        // console.log("today", today);
        const rng = seedrandom(today);

        // Fisher-Yates shuffle with a seeded random number generator
        for (let i = sortedProjects.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1)); // Generate a random index
          [sortedProjects[i], sortedProjects[j]] = [
            sortedProjects[j],
            sortedProjects[i],
          ]; // Swap
        }

        setProjects(sortedProjects);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  // useEffect(() => {
  //   fetch("/projects.json")
  //     .then((res) => res.json())
  //     .then((data: ProjectSection[]) => {
  //       // Flatten the projects and include the heading for each project
  //       const enrichedProjects = data.flatMap((section) =>
  //         section.projects.map((project) => ({
  //           ...project,
  //           heading: section.heading, // Add the heading from the section
  //         }))
  //       );

  //       // Sort the enriched projects in descending order by time and date
  //       const sortedProjects = enrichedProjects.sort((a, b) => {
  //         const dateA = new Date(
  //           a.addedOn.date.split("/").reverse().join("-") + " " + a.addedOn.time
  //         );
  //         const dateB = new Date(
  //           b.addedOn.date.split("/").reverse().join("-") + " " + b.addedOn.time
  //         );
  //         return dateB.getTime() - dateA.getTime(); // Descending order
  //       });

  //       // console.log("sortedProjects", sortedProjects);

  //       setProjects(sortedProjects);
  //     })
  //     .catch((error) => console.error("Error fetching projects:", error));
  // }, []);

  // useEffect(() => {
  //   fetch("/projects.json")
  //     .then((res) => res.json())
  //     .then((data: ProjectSection[]) => {
  //       // console.log("data", data.heading);
  //       // Flatten the projects and sort them in descending order by time and date
  //       const sortedProjects = data
  //         .flatMap((section) => section.projects)
  //         .sort((a, b) => {
  //           const dateA = new Date(
  //             a.addedOn.date.split("/").reverse().join("-") +
  //               " " +
  //               a.addedOn.time
  //           );
  //           const dateB = new Date(
  //             b.addedOn.date.split("/").reverse().join("-") +
  //               " " +
  //               b.addedOn.time
  //           );
  //           return dateB.getTime() - dateA.getTime(); // Descending order
  //         });

  //       console.log("sortedProjects", sortedProjects);

  //       setProjects(sortedProjects);
  //       // const shuffledProjects = projects.sort(() => Math.random() - 0.5);
  //       // setProjects(shuffledProjects);
  //     })
  //     .catch((error) => console.error("Error fetching projects:", error));
  // }, []);

  return (
    <main
      className={
        isMobile
          ? "m-3  min-h-screen mainPage"
          : "pl-6 pt-6 min-h-screen mainPage"
      }
    >
      {/* <section>
        <h1 className="text-3xl font-bold mb-1 mt-1">
          Trending Reads of the Day
        </h1>
        <div className="flex flex-col items-center justify-center   ">
          <div className="w-full ">
            <Carousel iframes={iframeSources} />
          </div>
        </div>
      </section> */}

      <section>
        <h1 className="text-3xl font-bold mb-1 mt-1">Full Blog Archive</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shuffledProjects
            .reverse()
            // .sort(() => Math.random() - 0.5)
            .map((project) => (
              <Link
                key={project.name}
                href={`/blog/${project.name}`}
                className="block p-4 rounded-lg shadow hover:shadow-md transition-shadow card"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {project.name.replace(/-/g, " ")}
                </h2>

                <p
                  style={{
                    textAlign: "left",
                  }}
                  className="text-gray-700"
                >
                  <>{project.heading?.replace(/-/g, " ")}</>
                </p>

                <p
                  style={{
                    textAlign: "left",
                  }}
                  className="text-gray-500"
                >
                  Added On: {project.addedOn.date} at {project.addedOn.time}
                </p>
                <p
                  style={{
                    textAlign: "left",
                  }}
                  className="text-gray-500"
                >
                  Author: {project.author}
                </p>
              </Link>
            ))}
        </div>
      </section>

      <section>
        <Link href="#about">
          <AboutMe />
        </Link>
        {/* <h1 className="text-3xl font-bold mb-1 mt-1">About Me</h1> */}
      </section>
    </main>
  );
}
