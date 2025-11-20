import Header from "@/components/Header";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Home, 
  Shield, 
  Cloud, 
  Zap, 
  CheckCircle2,
  Phone,
  Mail,
  MapPin
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import heroImage from "@/assets/hero-dark-modern.jpg";
import logo from "@/assets/nilesec-logo.png";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  const businessSection = useScrollAnimation();
  const residentialSection = useScrollAnimation();
  const aboutSection = useScrollAnimation();
  const contactSection = useScrollAnimation();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="IT Infrastructure"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/40 via-background/60 to-background/80" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
            Reliable IT Solutions for
            <br />
            <span className="bg-gradient-to-r from-accent to-white bg-clip-text text-transparent">
              Businesses and Homes
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
            24/7 support, network setup, cybersecurity, and technology management across North Jersey
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all hover:shadow-[var(--shadow-glow)] hover:scale-105 text-lg px-8 py-6"
            >
              Request a Free Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#business-services")}
              className="border-2 border-white text-white hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6 transition-all hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Business Services Section */}
      <section id="business-services" className="py-24 bg-secondary/30">
        <div 
          ref={businessSection.ref}
          className={`container mx-auto px-4 scroll-animate ${businessSection.isVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <Building2 className="h-16 w-16 mx-auto mb-6 text-primary" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Business IT Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IT management for small and mid-size businesses, designed to reduce costs, 
              improve efficiency, and scale with your growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <ServiceCard
              icon={Shield}
              title="IT Infrastructure & Security"
              description="Complete network, server, and cybersecurity management"
              features={[
                "Network & Server Setup",
                "Cybersecurity & Threat Protection",
                "Cloud Services & Virtualization",
                "24/7 Monitoring & Support"
              ]}
            />
            <ServiceCard
              icon={Zap}
              title="Managed IT Services"
              description="Proactive management to keep your business running smoothly"
              features={[
                "Cost-Effective IT Plans",
                "Dedicated IT Management",
                "Vendor Management",
                "Scalable Solutions"
              ]}
            />
            <ServiceCard
              icon={Cloud}
              title="Communication Solutions"
              description="Modern VoIP and unified communications"
              features={[
                "VoIP Phone Systems",
                "Unified Communications",
                "Remote Work Solutions",
                "Collaboration Tools"
              ]}
            />
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Get Business Support
            </Button>
          </div>
        </div>
      </section>

      {/* Residential Services Section */}
      <section id="residential-services" className="py-24 bg-background">
        <div 
          ref={residentialSection.ref}
          className={`container mx-auto px-4 scroll-animate ${residentialSection.isVisible ? 'visible' : ''}`}
        >
          <div className="text-center mb-16">
            <Home className="h-16 w-16 mx-auto mb-6 text-accent" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Residential IT Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert IT support for homeowners and remote workers. From computer troubleshooting 
              to smart home integration, we keep your technology running smoothly.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
            <ServiceCard
              icon={Shield}
              title="Home Network & Security"
              description="Optimized Wi-Fi and secure home networks"
              features={[
                "Wi-Fi Setup & Optimization",
                "Router & Mesh Network Installation",
                "Cybersecurity & Data Protection",
                "Secure Backups"
              ]}
            />
            <ServiceCard
              icon={Zap}
              title="Device Support & Smart Home"
              description="Complete support for all your devices and smart home needs"
              features={[
                "Computer & Laptop Support",
                "Home Office IT Setup",
                "Smart Home Integration",
                "Remote Support Available"
              ]}
            />
          </div>

          <div className="text-center">
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Get Home Support
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-secondary/30">
        <div 
          ref={aboutSection.ref}
          className={`container mx-auto px-4 scroll-animate ${aboutSection.isVisible ? 'visible' : ''}`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              About Nilesec Systems
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              Based in North Jersey, Nilesec Systems is a small business combining business and residential IT expertise 
              to deliver reliable, scalable, and cost-effective solutions. Our mission is to let you 
              focus on growth or enjoying your home while we manage your technology with personalized, 
              dedicated service.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {[ 
                { icon: CheckCircle2, label: "24/7 Reliable Support" },
                { icon: MapPin, label: "Local Expertise" },
                { icon: Zap, label: "Flexible & Scalable" },
                { icon: Shield, label: "Professional Service" }
              ].map((value, index) => {
                const ValueCard = () => {
                  const { ref, isVisible } = useScrollAnimation();
                  return (
                    <div
                      ref={ref}
                      key={index}
                      className={`scroll-animate ${isVisible ? 'visible' : ''} flex flex-col items-center p-6 rounded-xl bg-card border border-border hover:shadow-[var(--shadow-md)] hover:border-primary/50 transition-all hover:scale-105`}
                    >
                      <value.icon className="h-12 w-12 mb-4 text-accent" />
                      <p className="font-semibold text-card-foreground">{value.label}</p>
                    </div>
                  );
                };
                return <ValueCard key={index} />;
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-background">
        <div 
          ref={contactSection.ref}
          className={`container mx-auto px-4 scroll-animate ${contactSection.isVisible ? 'visible' : ''}`}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
                Get in Touch
              </h2>
              <p className="text-xl text-muted-foreground">
                Ready to secure, optimize, and manage your technology? Contact Nilesec Systems today 
                for a free consultation or support request.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:scale-105">
                <Phone className="h-8 w-8 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-card-foreground">Phone</p>
                  <a href="tel:(201) 922-6774" className="text-sm text-primary hover:text-accent transition-colors">
                    (201) 922-6774
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:scale-105">
                <Mail className="h-8 w-8 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-card-foreground">Email</p>
                  <a href="mailto:nilesecsystems@outlook.com" className="text-sm text-primary hover:text-accent transition-colors">
                    nilesecsystems@outlook.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:scale-105">
                <MapPin className="h-8 w-8 text-accent flex-shrink-0" />
                <div>
                  <p className="font-semibold text-card-foreground">Location</p>
                  <p className="text-sm text-muted-foreground">North Jersey</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 md:p-12 shadow-[var(--shadow-lg)] border border-border">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border text-card-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={logo} 
                  alt="Nilesec Systems" 
                  className="h-10 w-10"
                />
                <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Nilesec Systems
                </h3>
              </div>
              <p className="text-muted-foreground">
                Professional IT solutions for businesses and homes in North Jersey.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <div className="flex flex-col gap-2">
                <a href="#business-services" onClick={(e) => { e.preventDefault(); scrollToSection("#business-services"); }} className="text-muted-foreground hover:text-primary transition-colors">
                  Business Services
                </a>
                <a href="#residential-services" onClick={(e) => { e.preventDefault(); scrollToSection("#residential-services"); }} className="text-muted-foreground hover:text-primary transition-colors">
                  Residential Services
                </a>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }} className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <div className="flex flex-col gap-2">
                <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-muted-foreground">
            <p>© 2025 Nilesec Systems - North Jersey. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
