import { HeroSection } from "@/components/hero/HeroSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { SelectedWorkSection } from "@/components/selected-work/SelectedWorkSection";
import { ContactCTA } from "@/components/contact/ContactCTA";

/**
 * The landing page, in the order set out in spec section 1:
 * hero → what we deliver → selected work → contact.
 *
 * The fixed header, the fullscreen menu and the footer live in the layout,
 * since they are site-wide chrome rather than page content.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SelectedWorkSection />
      <ContactCTA />
    </>
  );
}
