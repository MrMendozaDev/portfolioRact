import { NavLink } from 'react-router-dom';
import { Home, BarChart } from 'lucide-react';
import { useConfig } from 'Context/ConfigContext'

const menu = [
  { icon: <Home size={20} />, label: 'Home', path: '/' },
  { icon: <BarChart size={20} />, label: 'FaceDetection', path: '/face-detection' },
];

export const Sidebar = () => {
  const config = useConfig();
  console.log('getConfig: ', config);
  
  return (
    <aside className="sm:hidden w-full md:w-64 bg-[#111827] text-white p-4">
      <nav className="flex flex-row items-center justify-end gap-2">
        {menu.map(({ icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? 'bg-gray-700 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`
            }
          >
            {icon}
            <span className="hidden md:inline">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
