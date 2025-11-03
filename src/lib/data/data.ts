import { NavItems } from "@/types/component.types";
import {
  BarChart2,
  Cpu,
  CreditCard,
  Eye,
  HandCoins,
  ListCollapseIcon,
  Package,
  Package2Icon,
  ScrollText,
  Server,
  Settings,
  Users,
  Wallet,
  Share,
} from "lucide-react";

///////////////////////////////Reseller Routes/////////////////////////////////////////////

export const ResellerNavItemsData: NavItems = [
  {
    title: "Dashboard",
    url: "/reseller/",
    icon: BarChart2,
    isCollapsible: false,
  },
  {
    title: "Packages",
    url: "/reseller/data-only-esim/",
    icon: Package2Icon,
    isCollapsible: false,
  },
  {
    title: "Dealers",
    url: "/reseller/dealers/",
    icon: Users,
    isCollapsible: false,
  },
  {
    title: "Credits",
    url: "/reseller/credits/",
    icon: CreditCard,
    isCollapsible: false,
  },
  {
    title: "Purchases",
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
        url: "/reseller/my-esims/",
        icon: ListCollapseIcon,
      },
      {
        title: "Assigned Bundles",
        url: "/reseller/bundles-old/",
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
        url: "/reseller/pricing/",
        icon: Eye,
      },
      {
        title: "Set Pricing",
        url: "/reseller/pricing/manage/",
        icon: Settings,
      },
    ],
  },
  {
    title: "Topup Account",
    url: "/reseller/topup/",
    icon: Wallet,
    isCollapsible: false,
  },
  {
    title: "API Docs",
    // url: "https://documenter.getpostman.com/view/23785463/2s9YCBu9tg",
    url: "/reseller/docs/",
    // target: "_blank",
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

export const resellerDataVoiceLinks = [
  {
    label: "Local",
    href: "/reseller/data-voice-esim/",
  },
  {
    label: "Regional",
    href: "/reseller/data-voice-esim/regional/",
  },
  {
    label: "Global",
    href: "/reseller/data-voice/global/",
  },
];

export const resellerDataOnlyLinks = [
  {
    label: "Local",
    href: "/reseller/data-only-esim/",
  },
  {
    label: "Regional",
    href: "/reseller/data-only-esim/regional/",
  },
  {
    label: "Global",
    href: "/reseller/data-only/global/",
  },
];

export const resellerPackagePagesLinks = [
  ...resellerDataOnlyLinks,
  ...resellerDataVoiceLinks,
];

/////////////////////////////////////////Dealer Routes/////////////////////////////////////////////////////////////////////////

export const DealerNavItemsData: NavItems = [
  {
    title: "Dashboard",
    url: "/dealer/",
    icon: BarChart2,
    isCollapsible: false,
  },
  {
    title: "Packages",
    url: "/dealer/data-only-esim/",
    icon: Package2Icon,
    isCollapsible: false,
  },
  {
    title: "Credits",
    url: "/dealer/credits/",
    icon: CreditCard,
    isCollapsible: false,
  },
  {
    title: "Purchases",
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
        url: "/dealer/my-esims/",
        icon: ListCollapseIcon,
      },
      {
        title: "Assigned Bundles",
        url: "/dealer/bundles-old/",
        icon: Package,
      },
    ],
  },
  {
    title: "View Pricing",
    url: "/dealer/pricing/",
    icon: Eye,
    isCollapsible: false,
  },
  {
    title: "Topup Account",
    url: "/dealer/topup/",
    icon: Wallet,
    isCollapsible: false,
  },
  {
    title: "API Docs",
    // url: "https://documenter.getpostman.com/view/23785463/2s9YCBu9tg",
    url: "/dealer/docs/",
    // target: "_blank",
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
export const AffiliateNavItemsData: NavItems = [
  {
    title: "Dashboard",
    url: "/affiliate/",
    icon: BarChart2,
    isCollapsible: false,
  },

  {
    title: "Credits",
    url: "/affiliate/credits/",
    icon: CreditCard,
    isCollapsible: false,
  },
  {
    title: "My Referral Code",
    url: "/affiliate/promocode/",
    icon: Share,
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

export const dealerDataVoiceLinks = [
  {
    label: "Local",
    href: "/dealer/data-voice-esim/",
  },
  {
    label: "Regional",
    href: "/dealer/data-voice-esim/regional/",
  },
  {
    label: "Global",
    href: "/dealer/data-voice/global/",
  },
];

export const dealerDataOnlyLinks = [
  {
    label: "Local",
    href: "/dealer/data-only-esim/",
  },
  {
    label: "Regional",
    href: "/dealer/data-only-esim/regional/",
  },
  {
    label: "Global",
    href: "/dealer/data-only/global/",
  },
];

export const dealerPackagesPagesLinks = [
  ...dealerDataOnlyLinks,
  ...dealerDataVoiceLinks,
];
