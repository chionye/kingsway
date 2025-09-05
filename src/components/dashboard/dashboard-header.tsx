/** @format */

import { Link } from "react-router-dom";
import { Bell, Menu, UserCircle } from "lucide-react";

const DashboardHeader = ({
  toggleMobileNav,
}: {
  toggleMobileNav: () => void;
}) => {
  return (
    <div className='flex items-center justify-between p-4 sm:px-6 md:px-10 h-16 bg-white border-b border-gray-200'>
      {/* Spacer div to push items to the right */}
      <div className='flex-1'>
        <button
          onClick={toggleMobileNav}
          className='lg:hidden fixed top-4 left-4 z-40 p-2 bg-gray-100 text-black rounded-lg hover:bg-blue-700 transition-colors'
          aria-label='Open navigation menu'>
          <Menu className='h-6 w-6' />
        </button>
      </div>

      {/* User and Notifications Section */}
      <div className='flex items-center space-x-4'>
        {/* User Profile */}
        <div className='flex items-center lg:space-x-2 p-2 bg-gray-100 rounded-lg'>
          <UserCircle className='h-5 w-5 text-gray-500' />
          <p className='hidden sm:block text-sm font-medium text-gray-700'>
            Super Admin
          </p>
        </div>

        {/* Notifications */}
        <Link
          to='/dashboard/admin/notifications'
          className='p-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200 transition-colors'>
          <Bell className='h-5 w-5' />
        </Link>
      </div>
    </div>
  );
};

export default DashboardHeader;
