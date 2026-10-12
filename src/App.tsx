import { ScrollSequence } from "./components/ScrollSequence";
import { Contact, Faq, Footer, Promises, Services } from "./components/Sections";
import { business } from "./content";

export default function App() {
  return (
    <>
      <a className="skip" href="#services">
        Skip to services
      </a>
      <header className="nav">
        <span className="nav__brand">{business.name}</span>
        <nav aria-label="Primary">
          <a href="#services">Services</a>
          <a href="#promises">Promises</a>
          <a href="#faq">FAQ</a>
          <a href="#contact">Contact</a>
          <a className="nav__call" href={business.phoneHref}>
            {business.phoneDisplay}
          </a>
        </nav>
      </header>
      <main>
        <ScrollSequence />
        <Services />
        <Promises />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
