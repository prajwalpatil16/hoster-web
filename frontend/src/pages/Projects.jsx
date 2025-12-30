import PageBanner from "../components/PageBanner";
import ProjectsGrid from "../components/projects/ProjectsGrid";
import HomeCTA from "../components/HomeCTA";

import projectsBanner from "../assets/images/project-banner.png";

export default function Projects() {
  return (
    <>
      <PageBanner
        title="Selected case studies"
        description="Real-world projects where engineering discipline and product thinking delivered measurable impact."
        backgroundImage={projectsBanner}
      />

      <ProjectsGrid />
      <HomeCTA />
    </>
  );
}
