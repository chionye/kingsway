/** @format */

import Icons from "@/constants/icons";

export const NavbarItems = {
  admin: [
    {
      to: "/dashboard/admin/home",
      icon: (color: string) => <Icons.dashboard color={color} />,
      label: "Dashboard",
    },
    {
      to: "/dashboard/admin/patients",
      icon: (color: string) => <Icons.users color={color} />,
      label: "Patients",
    },
    {
      to: "/dashboard/admin/pharmacy",
      icon: (color: string) => <Icons.pharmacy color={color} />,
      label: "Pharmacy",
    },
    {
      to: "/dashboard/admin/profile",
      icon: (color: string) => <Icons.profile color={color} />,
      label: "My Profile",
    },
    {
      to: "/dashboard/admin/users",
      icon: (color: string) => <Icons.admin color={color} />,
      label: "Users",
    },
  ],
};
