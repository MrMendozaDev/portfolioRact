import { NavLink } from 'react-router-dom';
import { Home, BarChart } from 'lucide-react';

const menu = [
  { icon: <Home size={20} />, label: 'Home', path: '/' },
  { icon: <BarChart size={20} />, label: 'FaceDetection', path: '/face-detection' },
];

export default function Sidebar() {
  return (
    <aside className="w-full bg-[#111827] text-white p-6">
      <nav className="flex flex-row">
        {menu.map(({ icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-3 py-2 rounded-md transition-colors ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            {icon}
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
