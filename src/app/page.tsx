"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  name: string;
  path: string;
  addedOn: {
    time: string;
    date: string;
  };
  author: string;
}

interface ProjectSection {
  heading: string;
  projects: Project[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data: ProjectSection[]) => {
        // Flatten the projects and sort them in descending order by time and date
        const sortedProjects = data
          .flatMap((section) => section.projects)
          .sort((a, b) => {
            const dateA = new Date(
              a.addedOn.date.split("/").reverse().join("-") +
                " " +
                a.addedOn.time
            );
            const dateB = new Date(
              b.addedOn.date.split("/").reverse().join("-") +
                " " +
                b.addedOn.time
            );
            return dateB.getTime() - dateA.getTime(); // Descending order
          });

        setProjects(sortedProjects);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link
            key={project.name}
            href={`/blog/${project.name}`}
            className="block bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
            <p className="text-gray-600">
              Added On: {project.addedOn.date} at {project.addedOn.time}
            </p>
            <p className="text-gray-600">Author: {project.author}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
