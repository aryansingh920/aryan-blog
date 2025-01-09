import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { ProjectSection } from "@/types/types";
import Card from "@/app/components/Card";

type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const jsonPath = path.join(process.cwd(), "public", "projects.json");
  let data: ProjectSection[] = [];

  try {
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    data = JSON.parse(rawData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }

  return data.map((section) => ({
    slug: section.heading.replace(/ /g, "-").toLowerCase(),
  }));
}

export default function SectionPage(props: unknown) {
  if (
    typeof props === "object" &&
    props !== null &&
    "params" in props &&
    typeof (props as PageProps).params?.slug === "string"
  ) {
    const { slug } = (props as PageProps).params;

    const jsonPath = path.join(process.cwd(), "public", "projects.json");
    let data: ProjectSection[] = [];

    try {
      const rawData = fs.readFileSync(jsonPath, "utf-8");
      data = JSON.parse(rawData);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      notFound();
    }

    const section = data.find(
      (section) => section.heading.replace(/ /g, "-").toLowerCase() === slug
    );

    if (!section) {
      notFound();
    }

    const { projects } = section;

    return (
      <main className="pl-6 pt-6 min-h-screen mainPage">
        <section>
          <h1 className="text-3xl font-bold mb-1 mt-1">{section.heading}</h1>

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

  notFound();
}
