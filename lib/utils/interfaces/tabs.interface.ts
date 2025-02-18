import { IGlobalComponentProps } from "./global.interface";

export interface ICustomTabProps extends IGlobalComponentProps {
  options: string[];
  selectedTab: string | undefined;
  setSelectedTab: (tab: string) => void;
}
export interface ITabeViewRoute {
  key: string;
  title: string;
}

export interface IOrderTabsComponentProps extends IGlobalComponentProps {
  route: ITabeViewRoute;
}
