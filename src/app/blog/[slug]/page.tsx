import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import type { ProjectSection, PageProps } from "@/types/types";

export async function generateStaticParams() {
  const jsonPath = path.join(process.cwd(), "public", "projects.json");
  let data: ProjectSection[] = [];
  try {
    const rawData = await fs.readFile(jsonPath, "utf-8");
    data = JSON.parse(rawData);
  } catch (error) {
    console.error("Error reading JSON file:", error);
  }
  // Generate paths for all projects
  return data.flatMap((section) =>
    section.projects.map((project) => ({
      params: { slug: project.name },
    }))
  );
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  if (!slug) {
    notFound();
  }

   const jsonPath = path.join(process.cwd(), "public", "projects.json");
   let data: ProjectSection[] = [];
   try {
     const rawData = await fs.readFile(jsonPath, "utf-8");
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
    htmlContent = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading HTML file:", error);
    notFound();
  }

  return (
    <div className="p-6 bg-white">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
