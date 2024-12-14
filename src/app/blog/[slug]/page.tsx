import fs from "fs";
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

  const jsonPath = path.join(process.cwd(), "public", "projects.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const data: ProjectSection[] = JSON.parse(rawData);

  console.log("Parsed JSON Data:", data);

  // Find the project path dynamically
  const projectPath = data
    .flatMap((section) => section.projects)
    .find((project) => project.name === params.slug)?.path;

  if (!projectPath) {
    return <h1>Project not found</h1>;
  }

  const filePath = path.join(process.cwd(), projectPath, "index.html");
  console.log("Resolved File Path:", filePath);

  let htmlContent = "";
  try {
    htmlContent = fs.readFileSync(filePath, "utf-8");
  } catch (error) {
    console.error("Error reading file:", error);
    return <h1>Project not found</h1>;
  }

  return (
    <div className="p-1">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
