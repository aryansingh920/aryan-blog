"use client";
/* eslint-disable @next/next/no-img-element */
import { Project } from "@/types/types";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface PageHeaderProps {
  sectionName: string;
  projects?: Project[];
  isMobile?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  sectionName,
  projects,
  isMobile,
}) => {
  const router = useRouter();
  return (
    <>
      <div>
        {" "}
        <div className="max-w rounded-lg">
          <Link href="https://linktr.ee/aryansingh20?utm_source=linktree_profile_share&ltsid=f474bb58-162c-4640-8a3e-f2e2145d0692">
            <div className="relative">
              <img
                src="1735963984496.jpeg"
                alt="Banner"
                className="w-full object-cover rounded-t-lg"
              />
            </div>
          </Link>

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
            <h1 className="text-3xl font-semibold mb-2">{sectionName}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-5">
        {projects && (
          <p className="text-center">
            {!isMobile && <b>Sort By Sections :</b>}
            {[...new Set(projects?.map((project) => project.heading))].map(
              (uniqueHeading, index) => (
                <Link
                  key={index}
                  href={"/section/" + uniqueHeading?.toLowerCase()}
                >
                  <Button
                    onPress={() => {
                      router.push("/section/" + uniqueHeading?.toLowerCase());
                    }}
                    className="m-1"
                    color="primary"
                    variant="ghost"
                  >
                    <b>{uniqueHeading}</b>
                  </Button>
                  {/* <p
                    className="m-1"
                  
                  > */}
                  {/* {uniqueHeading} */}
                  {/* </p> */}
                </Link>
              )
            )}
          </p>
        )}
      </div>
    </>
  );
};

export default PageHeader;
