import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lightbulb } from "lucide-react";

interface Props {
  apneaRisk: "Low" | "Medium" | "High" | null;
  sleepQuality: "Good" | "Average" | "Poor" | null;
}

const riskColors = {
  Low: "bg-success",
  Medium: "bg-warning",
  High: "bg-destructive",
};

const riskWidths = {
  Low: "w-1/3",
  Medium: "w-2/3",
  High: "w-full",
};

const qualityColors = {
  Good: "bg-success",
  Average: "bg-warning",
  Poor: "bg-destructive",
};

const recommendations: Record<string, string[]> = {
  Low: [
    "Maintain your current sleep schedule",
    "Continue regular physical activity",
    "Keep stress levels managed",
  ],
  Medium: [
    "Consider improving sleep hygiene",
    "Aim for 7-9 hours of sleep consistently",
    "Reduce screen time before bed",
    "Monitor your stress levels",
  ],
  High: [
    "Consult a healthcare professional",
    "Consider a sleep study evaluation",
    "Prioritize stress management techniques",
    "Maintain a consistent sleep schedule",
    "Avoid caffeine and alcohol before sleep",
  ],
};

const PredictionResults = ({ apneaRisk, sleepQuality }: Props) => {
  const hasResults = apneaRisk || sleepQuality;

  return (
    <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading text-lg">
          <ShieldCheck className="h-5 w-5 text-primary" />
          Prediction Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!hasResults ? (
          <div className="text-center py-12 text-muted-foreground">
            <ShieldCheck className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No predictions yet</p>
            <p className="text-sm mt-1">Fill in the form and click a predict button</p>
          </div>
        ) : (
          <>
            {apneaRisk && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sleep Apnea Risk</p>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold text-primary-foreground ${riskColors[apneaRisk]}`}>
                    {apneaRisk}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${riskColors[apneaRisk]} ${riskWidths[apneaRisk]} transition-all duration-700`} />
                </div>
              </div>
            )}

            {sleepQuality && (
              <div>
                <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">Sleep Quality</p>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold text-primary-foreground ${qualityColors[sleepQuality]}`}>
                    {sleepQuality}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${qualityColors[sleepQuality]} ${
                    sleepQuality === "Good" ? "w-1/3" : sleepQuality === "Average" ? "w-2/3" : "w-full"
                  } transition-all duration-700`} />
                </div>
              </div>
            )}

            {apneaRisk && (
              <div className="bg-secondary/60 rounded-xl p-4">
                <p className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Lightbulb className="h-4 w-4 text-warning" />
                  Recommendations
                </p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  {recommendations[apneaRisk].map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
