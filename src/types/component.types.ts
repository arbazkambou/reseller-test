import { LucideIcon } from "lucide-react";

/////////////////////////NavItems//////////////////////////////
export type NavItem = CollapsibleNavItem | SimpleNavItem;

type BaseNavItem = { title: string; icon: LucideIcon };

export type CollapsibleNavItem = BaseNavItem & {
  isCollapsible: true;
  items: {
    title: string;
    icon: LucideIcon;
    url: string;
  }[];
};

export type SimpleNavItem = BaseNavItem & {
  url: string;
  isCollapsible: false;
  target?: string;
};

export type NavItems = NavItem[];
