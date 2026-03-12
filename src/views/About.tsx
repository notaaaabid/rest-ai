import { Brain, Database, LineChart, Shield } from "lucide-react";

const items = [
  { icon: Brain, title: "Machine Learning", desc: "Trained on real-world sleep health datasets using classification models" },
  { icon: Database, title: "Comprehensive Data", desc: "Analyzes lifestyle, health indicators, and sleep patterns" },
  { icon: LineChart, title: "Predictive Analytics", desc: "Identifies sleep apnea risk and overall sleep quality" },
  { icon: Shield, title: "Privacy First", desc: "All analysis runs locally — no data is stored or shared" },
];

const About = () => (
  <div className="container mx-auto px-4 py-16 max-w-4xl">
    <h1 className="text-3xl md:text-4xl font-bold mb-4">About This Project</h1>
    <p className="text-lg text-muted-foreground font-body mb-10 leading-relaxed">
      This project uses machine learning models trained on real-world sleep health datasets to analyze lifestyle patterns and predict potential sleep disorders such as sleep apnea. By entering your health and lifestyle information, the system provides instant risk assessments and personalized recommendations.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="bg-card rounded-xl border border-border p-6 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-heading font-bold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground font-body">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default About;
