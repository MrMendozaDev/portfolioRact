import { useState } from 'react';
import { Menu, X, Home, BarChart } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const menu = [
  { icon: <Home size={20} />, label: 'Home', path: '/' },
  { icon: <BarChart size={20} />, label: 'FaceDetection', path: '/face-detection' },
];

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-white bg-[#111827]"
      >
        <Menu />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-[#111827] text-white p-4 z-50 transform transition-transform duration-300 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <X />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
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
              onClick={() => setOpen(false)}
            >
              {icon}
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </div>
  );
}
