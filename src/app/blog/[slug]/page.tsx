import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { ProjectSection } from "@/types/types";

// Manually clean type definition for props
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

  return data.flatMap((section) =>
    section.projects.map((project) => ({
      slug: project.name,
    }))
  );
}

export default function BlogPage(props: unknown) {
  // Add a type guard to ensure props structure
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

    const project = data
      .flatMap((section) => section.projects)
      .find((project) => project.name === slug);

    if (!project || !project.path) {
      notFound();
    }

    const filePath = path.join(process.cwd(), project.path, "index.html");
    let htmlContent = "";

    try {
      htmlContent = fs.readFileSync(filePath, "utf-8");
    } catch (error) {
      console.error("Error reading HTML file:", error);
      notFound();
    }

    return (
      <div className="html-content">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  }

  notFound(); // Fallback if type guard fails
}
