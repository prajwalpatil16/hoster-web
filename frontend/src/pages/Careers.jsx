import PageBanner from "../components/PageBanner";
import CareersWhy from "../components/careers/CareersWhy";
import CareersValues from "../components/careers/CareersValues";
import CareersOpenRoles from "../components/careers/CareersOpenRoles";
import CareersCTA from "../components/careers/CareersCTA";

import careerBanner from "../assets/images/career-banner.jpg";

export default function Careers() {
  return (
    <>
       <PageBanner
              title="Careers at Hoster"
              description="We don’t hire roles. We build engineers."
              backgroundImage={careerBanner}
            />

      <CareersWhy />
      <CareersValues />
      <CareersOpenRoles />
      <CareersCTA />
    </>
  );
}
