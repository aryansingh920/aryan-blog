"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import seedrandom from "seedrandom";

import { Project, ProjectSection } from "@/types/types";
import Card from "@/app/components/Card";
import PageHeader from "@/app/components/PageHeader";
import { fetchProjects } from "@/store/slices/projectsSlice";

// Import Redux store types
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

export default function SectionPage() {
  const params = useParams();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  // Use typed dispatch and selector
  const dispatch = useDispatch<AppDispatch>();
  const { sections, loading, error } = useSelector(
    (state: RootState) => state.projects
  );

  const [sectionName, setSectionName] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [localLoading, setLocalLoading] = useState(true);
  const [localError, setLocalError] = useState(false);
  // const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  // useEffect(() => {
  //   const checkViewport = () => setIsMobile(window.innerWidth < 768);
  //   checkViewport();
  //   window.addEventListener("resize", checkViewport);
  //   return () => window.removeEventListener("resize", checkViewport);
  // }, []);

  useEffect(() => {
    if (!slug) return;

    if (loading) {
      setLocalLoading(true);
      return;
    }

    if (error) {
      setLocalError(true);
      setLocalLoading(false);
      return;
    }

    if (sections.length > 0) {
      const foundSection = sections.find(
        (section: ProjectSection) =>
          section.heading.replace(/ /g, "-").toLowerCase() ===
          slug?.toLowerCase()
      );

      if (!foundSection) {
        setLocalError(true);
        setLocalLoading(false);
        return;
      }

      setSectionName(foundSection.heading);

      const today = new Date().toISOString().split("T")[0];
      const rng = seedrandom(today);
      const sortedProjects = [...foundSection.projects];

      for (let i = sortedProjects.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [sortedProjects[i], sortedProjects[j]] = [
          sortedProjects[j],
          sortedProjects[i],
        ];
      }

      setProjects(sortedProjects);
      setLocalLoading(false);
    } else {
      setLocalLoading(false);
      setProjects([]);
    }
  }, [slug, sections, loading, error]);

  if (localError) {
    return <p className="m-4 text-red-600">Section not found</p>;
  }

  if (localLoading) {
    return <Loader />;
  }

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
