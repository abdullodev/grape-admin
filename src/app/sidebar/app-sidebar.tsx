"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-users";

// This is sample data.
const data = {
  user: {
    name: "abdullo_me",
    email: "abdulloergashxojayev01@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Tashkent",
      logo: GalleryVerticalEnd,
      plan: "Main",
    },
    {
      name: "Namangan",
      logo: AudioWaveform,
      plan: "Secondary",
    },
    {
      name: "Fargana",
      logo: Command,
      plan: "Other",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: PieChart,
    },

    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      items: [
        {
          title: "Home",
          url: "/home",
        },
        {
          title: "Inbox",
          url: "/inbox",
        },
        {
          title: "Settings",
          url: "/settings",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Users",
          url: "/users",
        },
        {
          title: "Projects",
          url: "/projects",
        },
        {
          title: "Calnendar",
          url: "/calendar",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
