import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', reach: 100, engagement: 60, impressions: 40 },
  { name: 'Feb', reach: 120, engagement: 70, impressions: 50 },
  { name: 'Mar', reach: 90, engagement: 50, impressions: 30 },
  // Add more months...
];

export default function ChartSection() {
  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      <h2 className="text-lg font-bold mb-2">Profile Overview</h2>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="reach" stroke="#8884d8" />
          <Line type="monotone" dataKey="engagement" stroke="#82ca9d" />
          <Line type="monotone" dataKey="impressions" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
