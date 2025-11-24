import {
  IconAlertTriangle,
  IconArrowRight,
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconCommand,
  IconCreditCard,
  IconFile,
  IconFileText,
  IconHelpCircle,
  IconPhoto,
  IconDeviceLaptop,
  IconLayoutDashboard,
  IconLoader2,
  IconLogin,
  IconProps,
  IconShoppingBag,
  IconMoon,
  IconDotsVertical,
  IconPizza,
  IconPlus,
  IconSettings,
  IconSun,
  IconTrash,
  IconBrandTwitter,
  IconUser,
  IconUserCircle,
  IconUserEdit,
  IconUserX,
  IconX,
  IconLayoutKanban,
  IconBrandGithub
} from '@tabler/icons-react';

export type Icon = React.ComponentType<IconProps>;

function withViewBox(IconComponent: Icon) {
  return (props: IconProps) => (
    <IconComponent viewBox="2 0 26 26" {...props} />
  );
}


export const Icons = {
  dashboard: withViewBox(IconLayoutDashboard),
  logo: withViewBox(IconCommand),
  login: withViewBox(IconLogin),
  close: withViewBox(IconX),
  product: withViewBox(IconShoppingBag),
  spinner: withViewBox(IconLoader2),
  kanban: withViewBox(IconLayoutKanban),
  chevronLeft: withViewBox(IconChevronLeft),
  chevronRight: withViewBox(IconChevronRight),
  trash: withViewBox(IconTrash),
  employee: withViewBox(IconUserX),
  post: withViewBox(IconFileText),
  page: withViewBox(IconFile),
  userPen: withViewBox(IconUserEdit),
  user2: withViewBox(IconUserCircle),
  media: withViewBox(IconPhoto),
  settings: withViewBox(IconSettings),
  billing: withViewBox(IconCreditCard),
  ellipsis: withViewBox(IconDotsVertical),
  add: withViewBox(IconPlus),
  warning: withViewBox(IconAlertTriangle),
  user: withViewBox(IconUser),
  arrowRight: withViewBox(IconArrowRight),
  help: withViewBox(IconHelpCircle),
  pizza: withViewBox(IconPizza),
  sun: withViewBox(IconSun),
  moon: withViewBox(IconMoon),
  laptop: withViewBox(IconDeviceLaptop),
  github: withViewBox(IconBrandGithub),
  twitter: withViewBox(IconBrandTwitter),
  check: withViewBox(IconCheck),
};
