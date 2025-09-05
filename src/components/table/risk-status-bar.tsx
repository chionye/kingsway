/** @format */

import Icons from "@/constants/icons";
import { RISKS } from "@/constants/enums";

export const RiskStatusBar = () => {
  const data = [
    {
      label: RISKS.HIGH,
      color: "#FF4343",
      textColor: "#FF4343",
    },
    {
      label: RISKS.MEDIUM,
      color: "#FDD768",
      textColor: "#2F2F30",
    },
    {
      label: RISKS.LOW,
      color: "#FDD768",
      textColor: "#7D7E8E",
    },
    {
      label: RISKS.SAFE,
      color: "#09D312",
      textColor: "#7D7E8E",
    },
  ];
  return (
    <div className='bg-[#FFFAFA] border border-[#7D7E8E33] rounded-[8px] px-5 py-3 flex items-center'>
      <div className='flex items-center'>
        <div className='flex items-center gap-4'>
          {data.map((item) => (
            <div key={item.label} className='flex items-center gap-1'>
              <Icons.doughnut color={item.color} />
              <p
                className={`font-maven text-[14px] font-semibold text-[${item.textColor}]`}>
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};