import HeroSection from "../components/HeroSection";
import ExpertiseSection from "../components/ExpertiseSection";
import ProjectsPreview from "../components/ProjectsPreview";
import ProcessSection from "../components/ProcessSection";
import WhoWeAreSection from "../components/WhoWeAreSection";
import HomeCTA from "../components/HomeCTA";



export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhoWeAreSection />
      <ExpertiseSection />
      <ProjectsPreview />
      <ProcessSection />
      < HomeCTA />
    </main>
  );
}
