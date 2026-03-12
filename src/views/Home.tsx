import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Moon, Activity, Heart } from "lucide-react";

const features = [
  { icon: Brain, title: "AI-Powered Analysis", desc: "Machine learning models trained on real sleep health data" },
  { icon: Moon, title: "Sleep Apnea Detection", desc: "Identify potential sleep apnea risks early" },
  { icon: Activity, title: "Quality Prediction", desc: "Evaluate your overall sleep quality score" },
  { icon: Heart, title: "Health Insights", desc: "Get personalized recommendations for better sleep" },
];

const Home = () => (
  <div className="min-h-[calc(100vh-4rem)]">
    {/* Hero */}
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 py-1.5 text-sm font-medium mb-6">
          <Brain className="h-4 w-4" />
          AI-Powered Healthcare
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          AI-powered Sleep Apnea & Sleep Quality Prediction
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto font-body">
          Analyze your sleep health using machine learning. Enter your lifestyle and health details to detect potential sleep apnea risks and evaluate sleep quality.
        </p>
        <Link to="/sleep-analysis">
          <Button size="lg" className="text-base px-8 py-6 rounded-xl gap-2">
            Start Sleep Analysis <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
      </div>
    </section>

    {/* Features */}
    <section className="pb-24">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
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
    </section>
  </div>
);

export default Home;
