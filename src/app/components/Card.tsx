import React from "react";
import { Project } from "@/types/types";
import Link from "next/link";
import { Card, CardHeader, CardFooter, Image, Button } from "@nextui-org/react";

type ProjectsProps = {
  project: Project;
};

const CustomCard: React.FC<ProjectsProps> = ({ project }: ProjectsProps) => {
  const backgroundUrl = `https://image.pollinations.ai/prompt/${project.name}`;

  return (
    // <Link href={`/blog/${project.name}`}>
    <div className="Card">
      {/* <Link href={`/blog/${project.name}`}> */}
      <Card
        isFooterBlurred
        className="h-[300px] w-full relative shadow-md hover:shadow-lg transition-shadow"
      >
        <CardHeader className="absolute z-10 top-1 flex-col !items-start bg-black/40 bottom-0  border-t-1 border-gray-200">
          <p className="text-tiny text-white/60 uppercase font-bold">
            <Link
              href={`/section/${project.heading
                ?.toLowerCase()
                .replace(/ /g, "-")}`}
            >
              <u>{project.heading?.replace(/-/g, " ")}</u>
            </Link>
          </p>
          <Link href={`/blog/${project.name}`}>
            <h4 className="text-white font-medium text-xl">
              {project.name.replace(/-/g, " ")}
            </h4>
          </Link>
        </CardHeader>

        <Link href={`/blog/${project.name}`}>
          <Image
            removeWrapper
            alt={`Background for ${project.name}`}
            className="z-0 w-full h-full object-cover"
            src={backgroundUrl}
          />
        </Link>

        <Link href={`/blog/${project.name}`}>
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-gray-200 flex flex-col items-start">
            <p className="text-gray-300 text-sm">
              Added On: {project.addedOn.date} at {project.addedOn.time}
            </p>
            <p className="text-gray-300 text-sm">Author: {project.author}</p>
            {/* <Link href={`/blog/${project.name}`}> */}
            <Button
              style={{
                color: "white",
              }}
              className="mt-2"
              color="primary"
              radius="full"
              size="sm"
            >
              Read More
            </Button>
            {/* </Link> */}
          </CardFooter>
        </Link>
      </Card>
      {/* </Link> */}
    </div>

    // </Link>
  );
};

export default CustomCard;
