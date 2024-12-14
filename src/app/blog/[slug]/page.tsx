import fs from "fs/promises";
import path from "path";
import { ProjectSection } from "@/types/types";

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  // Ensure params are awaited
  if (!params?.slug) {
    return <h1>Invalid Route</h1>;
  }

  try {
    const jsonPath = path.join(process.cwd(), "public", "projects.json");
    const rawData = await fs.readFile(jsonPath, "utf-8");
    const data: ProjectSection[] = JSON.parse(rawData);

    // Find the project path dynamically
    const projectPath = data
      .flatMap((section) => section.projects)
      .find((project) => project.name === params.slug)?.path;

    if (!projectPath) {
      return <h1>Project not found</h1>;
    }

    const filePath = path.join(process.cwd(), projectPath, "index.html");
    const htmlContent = await fs.readFile(filePath, "utf-8");

    return (
      <div className="p-1">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>
    );
  } catch (error) {
    console.error("Error in BlogPage component:", error);
    return <h1>An error occurred</h1>;
  }
}
