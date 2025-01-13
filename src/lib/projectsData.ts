// src/lib/projectsData.ts
import fs from "fs";
import path from "path";
import type { ProjectSection } from "@/types/types";

export function readProjectsData(): ProjectSection[] {
  const jsonPath = path.join(process.cwd(), "public", "projects.json");
  try {
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const data: ProjectSection[] = JSON.parse(rawData);
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return [];
  }
}
