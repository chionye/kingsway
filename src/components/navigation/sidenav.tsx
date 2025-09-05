/** @format */

import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { getConfigByRole } from "@/services/storage";
import { NavbarItems } from "@/utils/navigation/nav-items";
import { LogOut } from "lucide-react";

const SideNavItem = ({
  to,
  icon,
  label,
  location,
}: {
  to: string;
  icon: React.ReactNode | ((color: string) => React.ReactNode);
  label: string;
  location: string;
}) => {
  const isActive = location.indexOf(to) !== -1;
  const iconColor = isActive ? "#FFFFFF" : "#4B5563"; // White for active, darker gray for inactive
  const iconComponent = typeof icon === "function" ? icon(iconColor) : icon;

  return (
    <div
      className={`relative py-3 px-4 w-full rounded-lg transition-all duration-200 cursor-pointer ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-700"
      }`}>
      <NavLink to={to} className='flex items-center gap-3'>
        {iconComponent}
        <span className='font-medium text-sm'>{label}</span>
      </NavLink>
    </div>
  );
};

const SideNav = () => {
  const location = useLocation();
  const role = getConfigByRole();
  const settings = role ? NavbarItems[role as keyof typeof NavbarItems] : [];

  return (
    <div className='hidden lg:flex flex-col fixed top-0 left-0 z-50 h-full bg-white border-r border-gray-200 shadow-sm p-6 space-y-8 w-[18%]'>
      {/* Logo Section */}
      <div className='flex justify-center items-center'>
        <NavLink to={"/"}>
          <img src={logo} alt='logo' className='w-[115px] h-[19.25px]' />
        </NavLink>
      </div>

      {/* Navigation Items */}
      <div className='flex-1 space-y-2'>
        {settings.map(
          (
            item: {
              to: string;
              icon: React.ReactNode | ((color: string) => React.ReactNode);
              label: string;
            },
            index: number
          ) => (
            <SideNavItem
              key={index}
              {...item}
              location={location.pathname}
              icon={item.icon}
            />
          )
        )}
        {/* Logout Button moved directly below other links */}
        <SideNavItem
          to='/logout' // You can create a new route for a clean logout process
          icon={(color) => <LogOut color={color} />}
          label='Logout'
          location={location.pathname}
        />
      </div>
    </div>
  );
};

export default SideNav;
