import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

interface SidebarMenuProps {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: {
    title: string;
    url: string;
  }[];
}

interface SidebarMenuItemProps {
  items: SidebarMenuProps[];
}

export function NavMain({ items }: SidebarMenuItemProps) {
  const { pathname } = useLocation();
  const { open, isMobile } = useSidebar();

  const isActive = (url: string) => pathname.startsWith(url);

  // Helper function to check if any child is active
  const hasActiveChild = (item: SidebarMenuProps) =>
    item.items?.some((subItem) => isActive(subItem.url)) ?? false;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const hasChildren = item.items && item.items.length > 0;

          if (hasChildren) {
            if (open || isMobile) {
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={hasActiveChild(item)}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        tooltip={item.title}
                        className={
                          hasActiveChild(item)
                            ? "bg-[var(--sidebar-accent)] hover:bg-[var(--sidebar-accent)] text-[var(--sidebar-accent-foreground)] hover:text-[var(--sidebar-accent-foreground)]"
                            : "hover:bg-[var(--sidebar-accent)]"
                        }
                      >
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              asChild
                              className={
                                isActive(subItem.url)
                                  ? "bg-[var(--sidebar-primary)] hover:bg-[var(--sidebar-primary)] text-white hover:text-white"
                                  : "hover:bg-[var(--sidebar-accent)]"
                              }
                            >
                              <Link to={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              );
            } else {
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={{
                      content: item.title,
                      className: "ml-2",
                      children: (
                        <SidebarMenuSub className="m-0 w-44">
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                className={
                                  isActive(subItem.url)
                                    ? "bg-gray-100 hover:bg-gray-100 dark:bg-gray-50 dark:hover:bg-gray-50  text-[var(--sidebar-primary)] hover:text-[var(--sidebar-primary)]"
                                    : "hover:bg-slate-100 dark:hover:bg-slate-400 text-white"
                                }
                              >
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      ),
                      side: "right",
                      align: "start",
                    }}
                    className={
                      hasActiveChild(item)
                        ? "bg-[var(--sidebar-primary)] hover:bg-[var(--sidebar-primary)] text-[var(--sidebar-primary-foreground)] hover:text-[var(--sidebar-primary-foreground)]"
                        : "hover:bg-[var(--sidebar-accent)]"
                    }
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            }
          }

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                className={
                  isActive(item.url)
                    ? "bg-[var(--sidebar-primary)] hover:bg-[var(--sidebar-primary)] text-white hover:text-white "
                    : "hover:bg-[var(--sidebar-accent)]"
                }
              >
                <Link to={item.url} className="flex items-center w-full">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
