import { Clients } from "@/components/Clients";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Services } from "@/components/Services";
import { Skills } from "@/components/Skills";
import { Smooth } from "@/components/Smooth";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Clients />
        <HowItWorks />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <Smooth />
    </>
  );
}
