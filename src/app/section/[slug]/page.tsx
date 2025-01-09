"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Project, ProjectSection } from "@/types/types";
import Card from "@/app/components/Card";

function capitalizeFirstLetter(str: string) {
  let heading: string =
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  //add "in projects" to the heading if its not in heading string
  if (!heading.includes("projects") && !heading.includes("project")) {
    heading += " in Projects";
  }
  return heading;
}

interface SectionPageProps {
  params: { slug: string }; // Get `slug` from the file-based routing
}

export default function SectionPage({ params }: SectionPageProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    // Resolve params using React.use()
    (async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    })();
  }, [params]);

  useEffect(() => {
    const checkViewport = () => setIsMobile(window.innerWidth < 768);
    checkViewport();
    window.addEventListener("resize", checkViewport);
    return () => window.removeEventListener("resize", checkViewport);
  }, []);

  useEffect(() => {
    if (!slug) return;

    fetch("/projects.json")
      .then((res) => res.json())
      .then((data: ProjectSection[]) => {
        // Flatten the projects and filter based on the heading matching the slug
        const enrichedProjects = data.flatMap((section) =>
          section.projects.map((project) => ({
            ...project,
            heading: section.heading,
          }))
        );

        // Filter projects based on the heading (slug)
        const filtered = enrichedProjects.filter(
          (project) => project.heading.replace(/ /g, "-").toLowerCase() === slug
        );

        setFilteredProjects(filtered);
      })
      .catch((error) =>
        console.error("Error fetching projects for section:", error)
      );
  }, [slug]);

  return (
    <main
      className={
        isMobile
          ? "m-3  min-h-screen mainPage"
          : "pl-6 pt-6 min-h-screen mainPage"
      }
    >
      <section>
        <h1 className="text-3xl font-bold mb-1 mt-1">
          {slug
            ? `${capitalizeFirstLetter(slug.replace(/-/g, " "))}`
            : "Loading..."}
        </h1>

        {filteredProjects.length === 0 ? (
          <p className="text-gray-500">No projects found for this section.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.name} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
