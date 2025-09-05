/** @format */

import Icons from "@/constants/icons";
import { Link } from "react-router-dom";

const ImageActionButton = ({
  firstButtonTitle,
  secondButtonTitle,
}: {
  firstButtonTitle?: string;
  secondButtonTitle?: string;
}) => {
  return (
    <div className='flex flex-row items-stretch sm:items-center lg:justify-center justify-between gap-2 lg:gap-3 w-full'>
      <Link to='/dashboard/admin/properties/new' className='w-1/2'>
        <div className='bg-[url("/images/ai-bg.jpg")] bg-cover bg-center text-white font-maven text-[14px] font-medium px-2 py-2 w-full lg:h-[168px] h-[90px] sm:h-[100px] rounded-s-2xl sm:rounded-none sm:rounded-s-2xl overflow-hidden mb-2 sm:mb-0 cursor-pointer relative'>
          <div className="bg-[url('/images/flash.png')] bg-no-repeat absolute inset-0 opacity-50 z-10 w-[85.4px] h-[85.4px] top-0 left-20"></div>
          <div className='flex items-end h-full py-2 relative z-50'>
            <span className='text-white text-base sm:text-xl text-left font-bold'>
              {firstButtonTitle}
            </span>
          </div>
        </div>
      </Link>
      <Link to='/dashboard/admin/properties/new' className='w-1/2'>
        <div className='bg-[#F5F5F7] text-[#7D7E8E] font-maven text-[14px] font-medium px-2 py-2 w-full lg:h-[168px] h-[90px] sm:h-[100px] flex flex-col justify-between cursor-pointer rounded-e-2xl sm:rounded-none sm:rounded-e-2xl overflow-hidden'>
          <div className='flex flex-row items-center justify-end w-full'>
            <Icons.flash />
          </div>
          <div className='bg-no-repeat bg-right-top h-full w-full px-2 flex items-end'>
            <span className='text-base sm:text-xl font-bold text-left '>
              {secondButtonTitle}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const GenericActionButton = ({
  title,
  subtitle,
  leftIcon,
  height,
  icon,
  link,
  count,
}: {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  icon?: React.ReactNode;
  height?: string;
  link: string;
  count?: string;
}) => {
  return (
    <div className='flex flex-row items-stretch sm:items-center lg:justify-center justify-between gap-2 lg:gap-3 w-full'>
      <Link to={link} className='w-full'>
        <div
          className={`bg-[#F5F9FF] text-[14px] px-2 py-2 w-full flex flex-col justify-between rounded-lg overflow-hidden mb-2 sm:mb-0 cursor-pointer ${
            height ? height : "lg:h-[124px] h-[90px] sm:h-[100px]"
          }`}>
          <div className='py-2 flex items-end justify-between h-full w-full'>
            <div className='w-full'>
              <div className='flex justify-end w-full'>
                <p className='text-[#2F2F30] text-[32px] font-semibold font-maven p-0'>
                  {count}
                </p>
              </div>
              {leftIcon ? (
                leftIcon
              ) : (
                <Icons.flash width='16' height='22' color='#00296B' />
              )}
              <p className='text-[#00296B] font-maven text-[14px] font-bold leading-tight'>
                {title}
              </p>
              {subtitle && (
                <p className='text-[#7D7E8E] font-maven text-xs font-medium'>
                  {subtitle}
                </p>
              )}
            </div>
            <div>{icon}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const NewContractCardButton = ({
  title,
  subtitle,
  leftIcon,
  height,
  icon,
  link,
}: {
  title?: string;
  subtitle?: string;
  leftIcon?: React.ReactNode;
  icon?: React.ReactNode;
  height?: string;
  link: string;
}) => {
  return (
    <div className='flex flex-row items-stretch sm:items-center lg:justify-center justify-between gap-2 lg:gap-3 w-full'>
      <Link to={link} className='w-full'>
        <div
          className={`bg-white px-2 py-2 w-full flex flex-col justify-between rounded-lg overflow-hidden mb-2 sm:mb-0 cursor-pointer ${
            height ? height : "lg:h-[124px] h-[90px] sm:h-[100px]"
          }`}>
          <div className='py-2 flex items-end justify-between h-full w-full'>
            <div className='w-full'>
              {leftIcon ? (
                leftIcon
              ) : (
                <Icons.flash width='64' height='64' color='#F5F5F7' />
              )}
              <p className='text-[#2F2F30] font-maven text-[20px] font-bold leading-tight'>
                {title}
              </p>
              {subtitle && (
                <p className='text-[#2F2F30] font-maven text-[16px] font-normal'>
                  {subtitle}
                </p>
              )}
            </div>
            <div>{icon}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export { ImageActionButton, GenericActionButton, NewContractCardButton };
