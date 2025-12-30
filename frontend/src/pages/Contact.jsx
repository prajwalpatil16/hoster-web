import contactBanner from "../assets/images/contactbanner.png";
import PageBanner from "../components/PageBanner";
import ContactHighlights from "../components/contact/ContactHighlights";
import ContactForm from "../components/contact/ContactForm";
import ContactInfoCards from "../components/contact/ContactInfoCards";

export default function Contact() {
  return (
    <>
      <PageBanner
        title="Let’s build something valuable"
        description="Share your goals and challenges. We’ll help you plan the right technical approach."
        backgroundImage={contactBanner}
      />

      <ContactHighlights />
      <ContactForm />
      <ContactInfoCards />
    </>
  );
}
