import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

const ServiceCard = ({ icon: Icon, title, description, features }: ServiceCardProps) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div 
      ref={ref}
      className={`scroll-animate ${isVisible ? 'visible' : ''}`}
    >
      <Card className="group p-8 hover:shadow-[var(--shadow-lg)] hover:shadow-primary/20 transition-all duration-500 border-border bg-card hover:scale-[1.02] hover:border-primary/50">
      <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-primary to-accent">
        <Icon className="h-8 w-8 text-primary-foreground" />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-card-foreground">{title}</h3>
      <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
            <span className="text-sm text-card-foreground">{feature}</span>
          </li>
        ))}
      </ul>
    </Card>
    </div>
  );
};

export default ServiceCard;
