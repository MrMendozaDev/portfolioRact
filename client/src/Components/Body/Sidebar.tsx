import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHome } from '@fortawesome/free-solid-svg-icons';
import { useConfig } from "Context/ConfigContext";

const menu = [
  {
    icon: <FontAwesomeIcon icon={faHome} />,
    label: "Home",
    path: "/",
  },
  {
    icon: <FontAwesomeIcon icon={faCamera} />,
    label: "IA",
    path: "/face-detection",
  },
];

export const Sidebar = () => {
  const config = useConfig();
  return (
    <aside className="max-md:hidden w-full bg-[#111827] text-white p-4">
      <nav className="flex flex-row items-center justify-end gap-2">
        {menu.map(({ icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-3 text-sm px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
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
};
