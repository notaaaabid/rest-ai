import { Activity } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-white/10 bg-black/20 backdrop-blur-lg py-8">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/70">
      <div className="flex items-center gap-2 font-heading font-bold text-white">
        <Activity className="h-4 w-4 text-primary" />
        Sleep Health Prediction System
      </div>
      <p>Built with React · TypeScript · Machine Learning</p>
    </div>
  </footer>
);

export default Footer;
