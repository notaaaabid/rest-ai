import { Brain, Database, LineChart, Shield } from "lucide-react";

const items = [
  { icon: Brain, title: "Machine Learning", desc: "Trained on real-world sleep health datasets using classification models" },
  { icon: Database, title: "Comprehensive Data", desc: "Analyzes lifestyle, health indicators, and sleep patterns" },
  { icon: LineChart, title: "Predictive Analytics", desc: "Identifies sleep apnea risk and overall sleep quality" },
  { icon: Shield, title: "Privacy First", desc: "All analysis runs locally — no data is stored or shared" },
];

const About = () => (
  <div className="container mx-auto px-4 py-16 max-w-4xl">
    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-xl">About This Project</h1>
    <p className="text-lg text-white/90 font-body mb-10 leading-relaxed drop-shadow-sm">
      This project uses machine learning models trained on real-world sleep health datasets to analyze lifestyle patterns and predict potential sleep disorders such as sleep apnea. By entering your health and lifestyle information, the system provides instant risk assessments and personalized recommendations.
    </p>

    <div className="grid sm:grid-cols-2 gap-6">
      {items.map(({ icon: Icon, title, desc }) => (
        <div key={title} className="bg-white/10 backdrop-blur-2xl rounded-xl border border-white/20 p-6 shadow-xl hover:bg-white/20 transition-all duration-300 text-white">
          <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="font-heading font-bold mb-1">{title}</h3>
          <p className="text-sm text-white/70 font-body">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default About;
