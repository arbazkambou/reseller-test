import { NavItems } from "@/types/component.types";
import {
  BarChart2,
  Cpu,
  CreditCard,
  Eye,
  HandCoins,
  ListCollapseIcon,
  Package,
  ScrollText,
  Server,
  Settings,
  Users,
  Wallet,
} from "lucide-react";

export const NavItemsData: NavItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: BarChart2,
    isCollapsible: false,
  },
  {
    title: "Dealers",
    url: "/dealers",
    icon: Users,
    isCollapsible: false,
  },
  {
    title: "Credits",
    url: "/credits",
    icon: CreditCard,
    isCollapsible: false,
  },
  {
    title: "eSIMs",
    icon: Cpu,
    isCollapsible: true,
    items: [
      // {
      //   title: "Buy eSIMs",
      //   url: "/buyEsim",
      //   icon: ShoppingCart,
      // },
      {
        title: "View eSIMs",
        url: "/my-esims",
        icon: ListCollapseIcon,
      },
      {
        title: "Bundles",
        url: "/reseller/bundles-old",
        icon: Package,
      },
    ],
  },
  {
    title: "Pricing",
    icon: HandCoins,
    isCollapsible: true,

    items: [
      {
        title: "View Pricing",
        url: "/pricing",
        icon: Eye,
      },
      {
        title: "Set Pricing",
        url: "/pricing/manage",
        icon: Settings,
      },
    ],
  },
  {
    title: "Topup Account",
    url: "/topup",
    icon: Wallet,
    isCollapsible: false,
  },
  {
    title: "API Docs",
    url: "https://documenter.getpostman.com/view/23785463/2s9YCBu9tg",
    target: "_blank",
    icon: ScrollText,
    isCollapsible: false,
  },
  {
    title: "Server Status",
    url: "https://esimcard.statuspage.io/",
    target: "_blank",
    icon: Server,
    isCollapsible: false,
  },
];

export const UserData = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "https://github.com/shadcn.png",
};
