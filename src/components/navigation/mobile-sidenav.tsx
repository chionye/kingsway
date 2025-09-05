/** @format */

// src/components/navigation/mobile-sidenav.tsx

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { getConfigByRole } from "@/services/storage";
import { NavbarItems } from "@/utils/navigation/nav-items";
import { LogOut, X } from "lucide-react";

const SideNavItemMobile = ({
  to,
  icon,
  label,
  location,
  onClick, // Add onClick to close the nav when an item is clicked
}: {
  to: string;
  icon: React.ReactNode | ((color: string) => React.ReactNode);
  label: string;
  location: string;
  onClick: () => void; // Function to call on item click
}) => {
  const isActive = location.indexOf(to) !== -1;
  const iconColor = isActive ? "#FFFFFF" : "#4B5563";
  const iconComponent = typeof icon === "function" ? icon(iconColor) : icon;

  return (
    <div
      className={`relative py-3 px-4 w-full rounded-lg transition-all duration-200 cursor-pointer ${
        isActive ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-700"
      }`}
      onClick={onClick} // Call onClick when the div is clicked
    >
      <NavLink to={to} className='flex items-center gap-3'>
        {iconComponent}
        <span className='font-medium text-sm'>{label}</span>
      </NavLink>
    </div>
  );
};

const MobileSideNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const location = useLocation();
  const role = getConfigByRole();
  const settings = role ? NavbarItems[role as keyof typeof NavbarItems] : [];

  // Prevent scrolling on the body when the mobile nav is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset"; // Clean up on unmount
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-gray-200 bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose} // Close nav when clicking outside
      ></div>

      {/* Mobile Sidenav Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full bg-white border-r border-gray-200 shadow-lg p-6 space-y-8 w-72 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        {/* Close Button */}
        <div className='flex justify-between items-center mb-6'>
          <NavLink to={"/"} onClick={onClose}>
            {" "}
            {/* Close nav on logo click too */}
            <img src={logo} alt='logo' className='w-[115px] h-[19.25px]' />
          </NavLink>
          <button
            onClick={onClose}
            className='p-2 text-gray-600 hover:text-gray-800 transition-colors'
            aria-label='Close navigation menu'>
            <X className='h-6 w-6' />
          </button>
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
              <SideNavItemMobile
                key={index}
                {...item}
                location={location.pathname}
                icon={item.icon}
                onClick={onClose} // Pass onClose to close the nav when an item is clicked
              />
            )
          )}
          {/* Logout Button */}
          <SideNavItemMobile
            to='/logout'
            icon={(color) => <LogOut color={color} />}
            label='Logout'
            location={location.pathname}
            onClick={onClose} // Pass onClose here too
          />
        </div>
      </div>
    </>
  );
};

export default MobileSideNav;
