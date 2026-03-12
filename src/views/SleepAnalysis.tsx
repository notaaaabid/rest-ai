import { useState } from "react";
import SleepForm, { FormData } from "@/components/SleepForm";
import PredictionResults from "@/components/PredictionResults";
import Charts from "@/components/Charts";

type Risk = "Low" | "Medium" | "High";
type Quality = "Good" | "Average" | "Poor";

// Simple mock prediction logic
const mockApnea = (data: FormData): Risk => {
  const stress = data.stressLevel;
  const bmi = data.bmiCategory;
  if (stress >= 7 || bmi === "obese") return "High";
  if (stress >= 4 || bmi === "overweight") return "Medium";
  return "Low";
};

const mockQuality = (data: FormData): Quality => {
  const sleep = parseFloat(data.sleepDuration) || 7;
  const stress = data.stressLevel;
  if (sleep >= 7 && stress <= 4) return "Good";
  if (sleep >= 5 && stress <= 7) return "Average";
  return "Poor";
};

const SleepAnalysis = () => {
  const [apneaRisk, setApneaRisk] = useState<Risk | null>(null);
  const [sleepQuality, setSleepQuality] = useState<Quality | null>(null);

  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      <div className="grid lg:grid-cols-2 gap-8">
        <SleepForm
          onPredictApnea={(d) => setApneaRisk(mockApnea(d))}
          onPredictQuality={(d) => setSleepQuality(mockQuality(d))}
        />
        <PredictionResults apneaRisk={apneaRisk} sleepQuality={sleepQuality} />
      </div>
      <Charts />
    </div>
  );
};

export default SleepAnalysis;
