/** @format */

import React from "react";
import { Badge } from "./badge";

const Chips = ({
  label,
  icon,
  bg,
  color,
}: {
  label: string | number;
  icon?: React.ReactNode;
  bg?: string;
  color?: string;
}) => {
  return (
    <Badge
      className={`flex items-center gap-2 px-4 py-2.5 ${
        bg ? bg : "bg-[#7D7E8E29]"
      } ${color ? color : "text-[#7D7E8E]"}`}>
      {icon && icon}
      {label}
    </Badge>
  );
};

export default Chips;
