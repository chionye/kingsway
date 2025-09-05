/** @format */

import type React from "react";
import { DynamicBreadcrumb } from "../dynamic-breadcrumb";

const InnerPageHeader = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className='flex lg:flex-row flex-col justify-between lg:gap-0 gap-2'>
      <DynamicBreadcrumb />
      {children}
    </div>
  );
};

export default InnerPageHeader;
