import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Internship from "./components/Internship";
import Placement from "./components/Placement";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import EnquiryPopup from "./components/EnquiryPopup";

function App() {
  return (
    <div className="font-body">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Internship />
        <Placement />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIChatbot />
      <EnquiryPopup />
    </div>
  );
}

export default App;
