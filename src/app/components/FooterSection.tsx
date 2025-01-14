import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store";
import { fetchProjects } from "@/store/slices/projectsSlice";
import { Project } from "@/types/types";
import CustomCard from "./Card";

const getTwoRandomNumbers = (min: number, max: number): [number, number] => {
  const first = Math.floor(Math.random() * (max - min + 1)) + min;
  let second = Math.floor(Math.random() * (max - min + 1)) + min;

  // Regenerate second until it's different from first
  while (second === first) {
    second = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return [first, second];
};

interface FooterSectionProps {
  isMobile: boolean;
}

const FooterSection = ({ isMobile }: FooterSectionProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { sections, loading, error } = useSelector(
    (state: RootState) => state.projects
  );
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [randomNumbers, setRandomNumbers] = useState<[number, number]>([0, 0]);

  // Fetch projects if not already loaded
  useEffect(() => {
    if (sections.length === 0) {
      dispatch(fetchProjects());
    }
  }, [dispatch, sections.length]);

  // Sort projects and set random numbers when projects are loaded
  useEffect(() => {
    if (!loading && !error && sections.length > 0) {
      // Flatten all projects from all sections
      const allProjects: Project[] = sections.flatMap(
        (section) => section.projects
      );
      // Sort projects by ascending id
      const sorted = allProjects.sort((a, b) => a.id - b.id);
      setSortedProjects(sorted);

      // Set random numbers after projects are sorted
      setRandomNumbers(getTwoRandomNumbers(0, sorted.length - 1));
    }
  }, [sections, loading, error]);

  useEffect(() => {}, []);

  // If loading or there's an error, show appropriate message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading projects</div>;
  }

  return (
    <div className={`flex space-x-${isMobile ? "5" : "20"} ml-5 mr-5 mb-5`}>
      <CustomCard project={sortedProjects[randomNumbers[0]]} />
      <CustomCard project={sortedProjects[randomNumbers[1]]} />
    </div>
  );
};

export default FooterSection;
