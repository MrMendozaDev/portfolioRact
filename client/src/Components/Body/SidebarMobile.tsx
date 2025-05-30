import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCamera,
  faClose,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

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

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-row md:hidden">
      <button
        onClick={() => setOpen(true)}
        className="p-3 text-white bg-[#111827]"
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-[#111827] text-white p-4 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={() => setOpen(false)} aria-label="Cerrar menú">
            <FontAwesomeIcon icon={faClose} />
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
                    ? "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
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
