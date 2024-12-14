interface Project {
  name: string;
  path: string;
}

interface ProjectSection {
  heading: string;
  projects: Project[];
}
// src/types/types.ts
export interface PageProps {
  params: {
    slug: string;
  };
}

type Params = {
  params: {
    slug: string;
  };
};

// src/types/types.ts

export type { Project, ProjectSection, Params };
