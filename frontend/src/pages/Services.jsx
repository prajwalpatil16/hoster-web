import PageBanner from "../components/PageBanner";
import ServicesOverview from "../components/services/ServicesOverview";
import ServicesList from "../components/services/ServicesList";
import HomeCTA from "../components/HomeCTA";

import servicesBanner from "../assets/images/services-banner.jpg";

export default function Services() {
  return (
    <>
      <PageBanner
        title="Services"
        description="End-to-end product engineering services designed for scale, clarity, and long-term success."
        backgroundImage={servicesBanner}
      />

      <ServicesOverview />
      <ServicesList />
      <HomeCTA />
    </>
  );
}
