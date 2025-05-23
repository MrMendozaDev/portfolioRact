import StatCard from '../Body/StatCard';
import ChartSection from '../Body/ChartSection';

export default function Dashboard() {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard label="Followers" value="78,423" growth={13.5} color="purple" />
        <StatCard label="Likes" value="50,113" growth={12.5} color="blue" />
        <StatCard label="Comments" value="4,223" growth={8.2} color="yellow" />
        <StatCard label="Reached" value="67,980" growth={6.7} color="gray" />
        {/* Add more if needed */}
      </div>
      <ChartSection />
    </div>
  );
}
