import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faHome,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { useConfig } from "Context/ConfigContext";

const Categories = [
  {
    icon: <FontAwesomeIcon icon={faHome} />,
    label: "Home",
    path: "/",
  },
  {
    icon: <FontAwesomeIcon icon={faCamera} />,
    label: "IA",
    path: "/ia-modules",
    subcategories: [
      {
        icon: <FontAwesomeIcon icon={faCamera} />,
        label: "Face",
        path: "/face-detection",
      },
      {
        icon: <FontAwesomeIcon icon={faCamera} />,
        label: "Handas",
        path: "/face-detection",
      },
      {
        icon: <FontAwesomeIcon icon={faCamera} />,
        label: "Plates",
        path: "/plates",
      },
    ],
  },
];

export const Sidebar = () => {
  const { appName } = useConfig();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <aside className="max-md:hidden text-white p-4 bg-[#111827]">
      <nav>
        <ul className="flex flex-row items-center justify-end gap-1">
          {Categories.map(({ icon, label, path, subcategories }) => (
            <li key={label} className="h-full relative group">
              {subcategories ? (
                <button
                  onClick={() => toggleSubmenu(label)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-gray-800 hover:bg-blue-700 transition text-left"
                >
                  <div className="flex items-center gap-3 text-sm text-white">
                    {icon}
                    <span>{label}</span>
                  </div>
                  <FontAwesomeIcon
                    icon={openSubmenus[label] ? faChevronUp : faChevronDown}
                    className="ml-2 fa-2xs"
                  />
                </button>
              ) : (
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 text-sm ${
                      isActive ? "text-white" : "text-gray-300"
                    }`
                  }
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              )}

              {subcategories && openSubmenus[label] && (
                <ul className="absolute left-0 top-full w-full bg-gray-700 shadow z-10">
                  {subcategories.map((sub) => (
                    <li key={sub.label}>
                      <NavLink
                        to={sub.path}
                        className="block px-6 py-2 text-sm hover:bg-blue-600"
                      >
                        {sub.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
