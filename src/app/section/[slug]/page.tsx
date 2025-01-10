import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import type { ProjectSection } from "@/types/types";
import Card from "@/app/components/Card";

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

  return data.map((section) => ({
    slug: section.heading.replace(/ /g, "-").toLowerCase(),
  }));
}

export default function SectionPage(props: unknown) {
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

    const section = data.find(
      (section) => section.heading.replace(/ /g, "-").toLowerCase() === slug
    );

    if (!section) {
      notFound();
    }

    const { projects } = section;

    return (
      <main className=" min-h-screen mainPage">
        <section>
          <div className="max-w rounded-lg ">
            <div className="relative">
              <img
                src="https://media.licdn.com/dms/image/v2/D5616AQF12usVORj44g/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1735963984496?e=1741824000&v=beta&t=0fflCZctRzBVR-E4KWnrM4_yPRVgOW3kZx1MVfgk8B4"
                alt="Banner"
                className="w-full  object-cover rounded-t-lg"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 text-white font-bold">
              <span className="text-sm">With banner image preview</span>
            </div> */}
            </div>

            <div className="relative flex justify-center">
              <div className="absolute -top-10">
                <img
                  src="/profile.jpeg"
                  alt="Profile"
                  className="w-20 h-20 rounded-full border-4 border-white"
                />
              </div>
            </div>

            <div className="mt-10 text-center">
              <h1 className="text-3xl font-semibold mb-2">{section.heading}</h1>
              {/* <div className="flex justify-center mt-4 space-x-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Message
              </button>
              <button className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400">
                Call
              </button>
            </div> */}
            </div>
          </div>

          {projects.length === 0 ? (
            <p className="text-gray-500">No projects found in this section.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.name} project={project} />
              ))}
            </div>
          )}
        </section>
      </main>
    );
  }

  notFound();
}
