/** @format */

import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
      <div className='w-full'>{children}</div>
    </div>
  );
}

export default Layout;
