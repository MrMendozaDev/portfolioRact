export default function StatCard({ label, value, growth, color }: any) {
  return (
    <div className="p-4 bg-white rounded-xl shadow flex flex-col gap-1 border">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-xl font-bold text-${color}-600`}>{value}</span>
      <span className="text-xs text-gray-400">{growth}% this week</span>
    </div>
  );
}
