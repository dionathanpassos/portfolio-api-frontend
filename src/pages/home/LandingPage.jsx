import { useEffect, useState } from "react";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";
import Project from "../../components/Project/Project";
import Timeline from "../../components/Timeline/Timeline";
import { getPortfilio } from "../../services/porfolioService";
import ApiOffline from "../../components/ApiOffline/ApiOffline";
import Stack from "../../components/Stack/Stack";
import Footer from "../../components/Footer/Footer";

export default function LandingPage() {
  const [apiOffline, setApiOffline] = useState();

  useEffect(() => {
    async function loadPortfolio() {
      try {
        await getPortfilio();
        setApiOffline(false);
      } catch (error) {
        console.log(error);
        if (!error.response || error.response.status >= 500) {
          setApiOffline(true);
        }
      }
    }

    loadPortfolio();
  }, []);

  return (
    <>
      {apiOffline ? (
        <ApiOffline />
      ) : (
        <div className="scroll-smooth">
          <Header />
          <Hero />
          <About />
          <Stack/>
          <Timeline />
          <Project />
          <Contact />
          <Footer/>
        </div>
      )}
    </>
  );
}
