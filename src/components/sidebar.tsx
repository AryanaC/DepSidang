import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { HomeIcon, Info, List, Package2Icon } from "lucide-react";

export default function Sidebar({ active }: { active: number }) {
  const menuItems = [
    {
      id: 0,
      href: '/dashboard',
      icon: HomeIcon,
      label: 'Dashboard',
    },
    {
      id: 1,
      href: '/dashboard/comment',
      icon: List,
      label: 'Comments',
    },
    {
      id: 2,
      href: '/dashboard/information',
      icon: Info,
      label: 'Information',
    },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <div className="flex flex-col items-center gap-4 px-2 py-5">
        <TooltipProvider>
          {menuItems.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                    active === item.id ? 'bg-neutral-900 text-white' : 'text-muted-foreground hover:text-foreground'
                  }`}
                  prefetch={false}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>
    </aside>
  );
}
