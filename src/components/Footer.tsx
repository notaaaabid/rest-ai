import { Activity } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-secondary/50 py-8">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
      <div className="flex items-center gap-2 font-heading font-bold text-foreground">
        <Activity className="h-4 w-4 text-primary" />
        Sleep Health Prediction System
      </div>
      <p>Built with React · TypeScript · Machine Learning</p>
    </div>
  </footer>
);

export default Footer;
