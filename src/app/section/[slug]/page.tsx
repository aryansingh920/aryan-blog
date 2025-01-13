/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectSection } from "@/types/types";
import Card from "@/app/components/Card";
import seedrandom from "seedrandom";
import PageHeader from "@/app/components/PageHeader";

// The same loader you used in Home.tsx
const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen loaderBg">
      {/* Spiral/Spinner container */}
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

export default function SectionPage() {
  // Next.js route parameters in App Router:
  // If you're using the new `useParams` hook:
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;
  // If you’re on older Next 13.x can also do `const { slug } = useRouter().query;`

  const [loading, setLoading] = useState(true);
  const [sectionName, setSectionName] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [projects, setProjects] = useState<any[]>([]); // or a proper Project type
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Fetch projects.json on the client
    fetch("/projects.json")
      .then((res) => res.json())
      .then((data: ProjectSection[]) => {
        // 1. Find the matching section
        console.log("at slug", projects);
        const foundSection = data.find(
          (section) =>
            section.heading.replace(/ /g, "-").toLowerCase() ===
            slug.toLowerCase()
        );

        if (!foundSection) {
          // no matching section => show 404 or handle gracefully
          setError(true);
          setLoading(false);
          return;
        }

        // 2. Set the section name
        setSectionName(foundSection.heading);

        // 3. “Shuffle” the projects the way you want, or just do random
        // If you want the same seeded logic:
        const today = new Date().toISOString().split("T")[0];
        const rng = seedrandom(today);
        const sortedProjects = [...foundSection.projects];

        // Fisher-Yates or simple random shuffle
        for (let i = sortedProjects.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [sortedProjects[i], sortedProjects[j]] = [
            sortedProjects[j],
            sortedProjects[i],
          ];
        }

        setProjects(sortedProjects);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading projects.json:", err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (error) {
    // Instead of a standard “notFound()”, you can show a custom message or
    // rely on Next’s default 404. For a manual 404:
    return <p className="m-4 text-red-600">Section not found</p>;
  }

  // Show our spiral loader while data is being fetched
  if (loading) {
    return <Loader />;
  }

  // If we have data:
  return (
    <main className="min-h-screen mainPage">
      <section>
        <PageHeader sectionName={sectionName} />

        {projects.length === 0 ? (
          <p className="text-gray-500">No projects found in this section.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.name} project={project} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
