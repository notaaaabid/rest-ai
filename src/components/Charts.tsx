import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ScatterChart, Scatter, LineChart, Line,
} from "recharts";

const stressData = [
  { stress: 1, quality: 9.2 },
  { stress: 2, quality: 8.8 },
  { stress: 3, quality: 8.1 },
  { stress: 4, quality: 7.5 },
  { stress: 5, quality: 6.8 },
  { stress: 6, quality: 6.0 },
  { stress: 7, quality: 5.1 },
  { stress: 8, quality: 4.2 },
  { stress: 9, quality: 3.5 },
  { stress: 10, quality: 2.8 },
];

const activityData = [
  { activity: "Low", duration: 5.2 },
  { activity: "Moderate", duration: 6.8 },
  { activity: "Active", duration: 7.5 },
  { activity: "Very Active", duration: 7.9 },
];

const bmiData = [
  { bmi: "Underweight", risk: 25 },
  { bmi: "Normal", risk: 12 },
  { bmi: "Overweight", risk: 45 },
  { bmi: "Obese", risk: 72 },
];

const BLUE = "#000FFF";

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Card className="shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-shadow duration-300">
    <CardHeader>
      <CardTitle className="font-heading text-base">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-64">{children}</div>
    </CardContent>
  </Card>
);

const Charts = () => (
  <section className="space-y-6">
    <h2 className="font-heading text-2xl font-bold">Sleep Insights</h2>
    <div className="grid md:grid-cols-3 gap-6">
      <ChartCard title="Stress Level vs Sleep Quality">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={stressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis dataKey="stress" label={{ value: "Stress", position: "insideBottom", offset: -5 }} tick={{ fontSize: 12 }} />
            <YAxis label={{ value: "Quality", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="quality" stroke={BLUE} strokeWidth={2} dot={{ fill: BLUE }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Physical Activity vs Sleep Duration">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis dataKey="activity" tick={{ fontSize: 11 }} />
            <YAxis label={{ value: "Hours", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="duration" fill={BLUE} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="BMI vs Sleep Disorder Risk">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={bmiData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 91%)" />
            <XAxis dataKey="bmi" tick={{ fontSize: 11 }} />
            <YAxis label={{ value: "Risk %", angle: -90, position: "insideLeft" }} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="risk" fill={BLUE} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  </section>
);

export default Charts;
