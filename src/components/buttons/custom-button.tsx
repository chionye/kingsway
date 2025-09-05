/** @format */

import type { CustomButtonProps } from "@/types";
import { Button } from "../ui/button";

export const CustomButton = ({
  label,
  onClick,
  icon,
  iconPosition = "left",
  ...props
}: CustomButtonProps) => {
  return (
    <div>
      <Button {...props} onClick={onClick}>
        {iconPosition === "left" && (
          <>
            {icon}
            {label}
          </>
        )}
        {iconPosition === "right" && (
          <>
            {label}
            {icon}
          </>
        )}
      </Button>
    </div>
  );
};
