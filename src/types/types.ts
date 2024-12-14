interface Project {
  name: string;
  path: string;
}

interface ProjectSection {
  heading: string;
  projects: Project[];
}

export type { Project, ProjectSection };
