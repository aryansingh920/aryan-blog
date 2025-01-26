import path from "path";
import fs from "fs";
import { notFound } from "next/navigation";
import type { ProjectSection } from "@/types/types";
import ReadingTimeNotification from "@/app/components/ReadingTimeNotification";
import { readProjectsData } from "@/lib/projectsData";

import MathJaxWrapper from "@/app/components/MathJaxWrapper";
type PageProps = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const data = readProjectsData();

  return data.flatMap((section: ProjectSection) =>
    section.projects.map((project) => ({
      slug: project.name,
    }))
  );
}

export default function BlogPage(props: unknown) {
  if (
    typeof props === "object" &&
    props !== null &&
    "params" in props &&
    typeof (props as PageProps).params?.slug === "string"
  ) {
    const { slug } = (props as PageProps).params;
    const data = readProjectsData();

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
      <MathJaxWrapper>
        <div>
          <ReadingTimeNotification htmlContent={htmlContent} />
          <div
            className={`html-content`}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>
      </MathJaxWrapper>
    );
  }

  notFound();
}
