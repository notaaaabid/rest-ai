import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, RotateCcw } from "lucide-react";

export interface FormData {
  gender: string;
  age: string;
  occupation: string;
  sleepDuration: string;
  physicalActivity: number;
  stressLevel: number;
  dailySteps: string;
  bmiCategory: string;
  bloodPressure: string;
  heartRate: string;
}

const defaultForm: FormData = {
  gender: "",
  age: "",
  occupation: "",
  sleepDuration: "",
  physicalActivity: 5,
  stressLevel: 5,
  dailySteps: "",
  bmiCategory: "",
  bloodPressure: "",
  heartRate: "",
};

interface Props {
  onPredictApnea: (data: FormData) => void;
  onPredictQuality: (data: FormData) => void;
}

const SleepForm = ({ onPredictApnea, onPredictQuality }: Props) => {
  const [form, setForm] = useState<FormData>(defaultForm);

  const update = (key: keyof FormData, value: string | number) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-heading text-lg">
          <ClipboardList className="h-5 w-5 text-primary" />
          Health & Lifestyle Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Personal Info */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Personal Information</h3>
          <div className="grid gap-4">
            <div>
              <Label>Gender</Label>
              <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Age</Label>
              <Input type="number" placeholder="e.g. 35" value={form.age} onChange={(e) => update("age", e.target.value)} />
            </div>
            <div>
              <Label>Occupation</Label>
              <Select value={form.occupation} onValueChange={(v) => update("occupation", v)}>
                <SelectTrigger><SelectValue placeholder="Select occupation" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="engineer">Engineer</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                  <SelectItem value="nurse">Nurse</SelectItem>
                  <SelectItem value="salesperson">Salesperson</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Lifestyle */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Lifestyle Data</h3>
          <div className="grid gap-4">
            <div>
              <Label>Sleep Duration (hours)</Label>
              <Input type="number" step="0.5" placeholder="e.g. 7.5" value={form.sleepDuration} onChange={(e) => update("sleepDuration", e.target.value)} />
            </div>
            <div>
              <Label>Physical Activity Level: {form.physicalActivity}</Label>
              <Slider min={1} max={10} step={1} value={[form.physicalActivity]} onValueChange={([v]) => update("physicalActivity", v)} className="mt-2" />
            </div>
            <div>
              <Label>Stress Level: {form.stressLevel}</Label>
              <Slider min={1} max={10} step={1} value={[form.stressLevel]} onValueChange={([v]) => update("stressLevel", v)} className="mt-2" />
            </div>
            <div>
              <Label>Daily Steps</Label>
              <Input type="number" placeholder="e.g. 8000" value={form.dailySteps} onChange={(e) => update("dailySteps", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Health */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Health Indicators</h3>
          <div className="grid gap-4">
            <div>
              <Label>BMI Category</Label>
              <Select value={form.bmiCategory} onValueChange={(v) => update("bmiCategory", v)}>
                <SelectTrigger><SelectValue placeholder="Select BMI" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="underweight">Underweight</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="overweight">Overweight</SelectItem>
                  <SelectItem value="obese">Obese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Blood Pressure</Label>
              <Input placeholder="e.g. 120/80" value={form.bloodPressure} onChange={(e) => update("bloodPressure", e.target.value)} />
            </div>
            <div>
              <Label>Heart Rate (bpm)</Label>
              <Input type="number" placeholder="e.g. 72" value={form.heartRate} onChange={(e) => update("heartRate", e.target.value)} />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 pt-2">
          <Button onClick={() => onPredictApnea(form)} className="flex-1 min-w-[140px]">
            Predict Sleep Apnea
          </Button>
          <Button onClick={() => onPredictQuality(form)} className="flex-1 min-w-[140px]">
            Predict Sleep Quality
          </Button>
          <Button variant="outline" onClick={() => setForm(defaultForm)} className="flex items-center gap-1">
            <RotateCcw className="h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SleepForm;
