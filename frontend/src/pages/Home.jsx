import HeroSection from "../components/HeroSection";
import ExpertiseSection from "../components/ExpertiseSection";
import ProjectsPreview from "../components/ProjectsPreview";
import ProcessSection from "../components/ProcessSection";
import WhoWeAreSection from "../components/WhoWeAreSection";
import PricingSection from "../components/PricingSection";
import HomeCTA from "../components/HomeCTA";



export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhoWeAreSection />
      <ExpertiseSection />
      <PricingSection />
      <ProjectsPreview />
      <ProcessSection />
      < HomeCTA />
    </main>
  );
}
