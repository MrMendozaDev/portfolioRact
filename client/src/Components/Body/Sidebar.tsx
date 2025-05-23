import { Home, BarChart, Calendar, FileText, User, HelpCircle, Settings } from 'lucide-react';

const menu = [
  { icon: <Home size={20} />, label: 'Overview' },
  { icon: <BarChart size={20} />, label: 'Analytics' },
  { icon: <Calendar size={20} />, label: 'Post Schedule' },
  { icon: <FileText size={20} />, label: 'Report' },
  { icon: <User size={20} />, label: 'Account' },
  { icon: <HelpCircle size={20} />, label: 'Support' },
  { icon: <Settings size={20} />, label: 'Setting' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111827] text-white h-screen p-6">
      <nav className="flex flex-col gap-4">
        {menu.map(({ icon, label }) => (
          <button key={label} className="flex items-center gap-3 text-sm hover:text-gray-300">
            {icon}
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
