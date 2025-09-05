/** @format */

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Icons from "@/constants/icons";
import type { CardData } from "@/types";
import { Link } from "react-router-dom";

const DataCountCard = ({
  count,
  title,
  subtitle,
  curvePosition,
  iconColor,
  bgColor,
  buttonTitle,
  buttonLink,
  buttonColor,
  ButtonTextColor,
}: CardData) => {
  return (
    <Card
      className={`border w-full flex justify-between px-5 py-2 rounded-none ${
        curvePosition === "top"
          ? "rounded-t-2xl"
          : curvePosition === "bottom"
          ? "rounded-b-2xl"
          : "rounded-2xl"
      } ${bgColor ? bgColor : "bg-white"}`}>
      <CardHeader className='p-0 w-full flex justify-between'>
        <Icons.candleSticks secColor={iconColor} />
        <CardTitle className='text-[#2F2F30] text-[32px] font-semibold font-maven p-0'>
          {count}
        </CardTitle>
      </CardHeader>
      <CardContent className='text-[#2F2F30] text-[16px] font-maven text-left p-0'>
        {title}
        <div>
          <p className='font-maven text-[#7D7E8E] text-xs font-medium'>
            {subtitle && subtitle}
          </p>
        </div>
      </CardContent>
      {buttonTitle && buttonLink && (
        <CardFooter>
          <Link
            to={buttonLink as never}
            className={`w-full font-bold px-4 py-2 rounded-[8px] font-maven text-center text-xs cursor-pointer hover:bg-[#F5F9FF] hover:text-[#2F2F30] ${
              buttonColor ? buttonColor : "bg-[#F5F9FF]"
            } ${ButtonTextColor ? ButtonTextColor : "text-[#2F2F30]"}`}>
            {buttonTitle}
          </Link>
        </CardFooter>
      )}
    </Card>
  );
};

export default DataCountCard;
