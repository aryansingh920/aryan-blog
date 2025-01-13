/* eslint-disable @next/next/no-img-element */
import { Project } from "@/types/types";
import Link from "next/link";
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
  return (
    <>
      <div>
        {" "}
        <div className="max-w rounded-lg">
          <Link href="https://linktr.ee/aryansingh20?utm_source=linktree_profile_share&ltsid=f474bb58-162c-4640-8a3e-f2e2145d0692">
            <div className="relative">
              <img
                src="https://media.licdn.com/dms/image/v2/D5616AQF12usVORj44g/profile-displaybackgroundimage-shrink_350_1400/profile-displaybackgroundimage-shrink_350_1400/0/1735963984496?e=1741824000&v=beta&t=0fflCZctRzBVR-E4KWnrM4_yPRVgOW3kZx1MVfgk8B4"
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
                  style={{
                    borderRadius: "10px",
                    padding: "5px",
                    margin: "5px",
                    backgroundColor: "rgba(0,112,255,0.8)",
                    border: "1px solid rgba(0,0,0,0.1)",
                    color: "white",

                    //don't change the line
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0,112,255,0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "rgba(0,112,255,0.8)";
                  }}
                  key={index}
                  href={"/section/" + uniqueHeading?.toLowerCase()}
                >
                  {/* <p
                    className="m-1"
                  
                  > */}
                  {uniqueHeading}
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
