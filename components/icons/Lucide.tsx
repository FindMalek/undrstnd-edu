import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Command,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  Moon,
  PencilIcon,
  MoreVertical,
  Pizza,
  Plus,
  UserCogIcon,
  Settings,
  SunMedium,
  Trash,
  UserCircleIcon,
  X,
  Search,
  PhoneIcon,
  MailIcon,
  BookOpenText,
  LucideIcon,
  Monitor,
  Github,
  ChevronsUpDown,
} from "lucide-react";

import {
  AiFillFilePdf,
  AiFillWechat,
  AiFillDatabase,
  AiFillQuestionCircle,
  AiFillBell,
  AiFillMobile,
} from "react-icons/ai";

export type Icon = LucideIcon;

export const Icons = {
  logo: Command,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: UserCircleIcon,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  search: Search,
  gitHub: Github,
  twitter: X,
  check: Check,
  orderbook: BookOpenText,
  pdf: AiFillFilePdf,
  chat: AiFillWechat,
  storage: AiFillDatabase,
  questions: AiFillQuestionCircle,
  notifications: AiFillBell,
  mobile: AiFillMobile,
  chevronsUpDown: ChevronsUpDown,
  phone: PhoneIcon,
  mail: MailIcon,
  pencil: PencilIcon,
  student: PencilIcon,
  teacher: UserCogIcon,
  monitor: Monitor,
};
