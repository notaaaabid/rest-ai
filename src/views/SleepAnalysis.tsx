import { useState } from "react";
import SleepForm, { FormData } from "@/components/SleepForm";
import PredictionResults from "@/components/PredictionResults";

type Risk = "Low" | "Medium" | "High";
type Quality = "Good" | "Average" | "Poor";

const fetchPrediction = async (data: FormData) => {
  const payload = {
    gender: data.gender || "Other",
    age: parseFloat(data.age) || 30,
    occupation: data.occupation || "Other",
    sleep_duration: parseFloat(data.sleepDuration) || 7.0,
    activity: data.physicalActivity || 5,
    stress: data.stressLevel || 5,
    bmi: data.bmiCategory || "Normal",
    blood_pressure: data.bloodPressure || "120/80",
    heart_rate: parseFloat(data.heartRate) || 70,
    steps: parseFloat(data.dailySteps) || 5000,
  };

  const response = await fetch("http://127.0.0.1:8000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch prediction");
  }

  return await response.json();
};

const SleepAnalysis = () => {
  const [prediction, setPrediction] = useState<{ type: "Apnea" | "Quality"; result: string } | null>(null);

  return (
    <div className="container mx-auto px-4 py-10 space-y-12">
      <div className="grid lg:grid-cols-2 gap-8">
        <SleepForm
          onPredictApnea={async (d) => {
            try {
              const res = await fetchPrediction(d);
              setPrediction({ type: "Apnea", result: res.apnea_prediction });
            } catch (err) {
              console.error(err);
              // Fallback or error tracking here
            }
          }}
          onPredictQuality={async (d) => {
            try {
              const res = await fetchPrediction(d);
              setPrediction({ type: "Quality", result: res.quality_prediction });
            } catch (err) {
              console.error(err);
            }
          }}
          onClear={() => setPrediction(null)}
        />
        <PredictionResults prediction={prediction} />
      </div>
    </div>
  );
};

export default SleepAnalysis;
