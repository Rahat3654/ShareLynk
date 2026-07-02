import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Downloads } from "@/components/sections/Downloads";
import { Features } from "@/components/sections/Features";
import { About } from "@/components/sections/About";
import { Roadmap } from "@/components/sections/Roadmap";
import { Faq } from "@/components/sections/Faq";
import { Newsletter } from "@/components/sections/Newsletter";
import { Contact } from "@/components/sections/Contact";

// Revalidate the home page so newly published releases appear without a rebuild.
export const revalidate = 60;

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Downloads />
        <Features />
        <About />
        <Roadmap />
        <Faq />
        <Newsletter />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
