// src/types/types.ts

export type PageProps = {
  params: Record<string, string>;
};


export interface Project {
  name: string;
  path: string;
}

export interface ProjectSection {
  heading: string;
  projects: Project[];
}
