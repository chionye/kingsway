export interface HomeTableData {
  sn: string;
  name: string;
  status: string;
  date: string;
  action: string;
}

export interface SearchAndTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (query: string) => void;
}

export interface DashboardHeaderProps {
  userName: string;
}

export type { CardData } from "@/types";
