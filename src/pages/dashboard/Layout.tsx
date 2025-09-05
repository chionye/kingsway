/** @format */

import React, { useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import SideNav from "@/components/navigation/sidenav";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import MobileSideNav from "@/components/navigation/mobile-sidenav";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const persister = createAsyncStoragePersister({
  storage: window.localStorage,
});

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}>
      <div className="bg-[url('/images/bg.jpg')] bg-cover bg-center min-h-screen w-full flex">
        <SideNav />
        <div className='bg-gray-50/80 backdrop-blur-sm min-h-screen flex flex-col w-full overflow-y-scroll'>
          <div className={`w-full flex justify-end`}>
            <div className='lg:w-[82%] w-full flex flex-col h-full overflow-y-scroll'>
              <DashboardHeader toggleMobileNav={toggleMobileNav} />
              <div className='w-full lg:p-10 p-3 overflow-y-scroll h-full'>
                {children}
              </div>
            </div>
          </div>
        </div>
        {/* Mobile Sidenav Overlay */}
        <MobileSideNav isOpen={isMobileNavOpen} onClose={toggleMobileNav} />
      </div>
    </PersistQueryClientProvider>
  );
}

export default DashboardLayout;
