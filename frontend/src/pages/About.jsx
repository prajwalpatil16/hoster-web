import PageBanner from "../components/PageBanner";
import servicesBanner from "../assets/images/services-banner.jpg";
import WhoWeAreSection from "../components/WhoWeAreSection";
import HowWeThink from "../components/about/HowWeThink";
import WhyHoster from "../components/about/WhyHoster.jsx";
import AboutStats from "../components/about/AboutStats";
import HomeCTA from "../components/HomeCTA";

export default function About() {
  return (
    <>
       <PageBanner
              title="About Us"
              description="Engineers focused on clarity, quality, and scale. Building products that last."
              backgroundImage={servicesBanner}
            />

      <WhoWeAreSection />
      <HowWeThink />
      <WhyHoster />
      <AboutStats />
      <HomeCTA />
      
    </>
  );
}
