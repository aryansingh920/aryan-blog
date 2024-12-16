// src/types/types.ts

export type PageProps = {
  params: Record<string, string>;
};


export interface Project {
  id: number;
  name: string;
  path: string;
  addedOn: {
    time: string;
    date: string;
  };
  author: string;
}

export interface ProjectSection {
  heading: string;
  projects: Project[];
}
