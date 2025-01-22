'use client';
import * as React from 'react';
import { Settings2, SquareTerminal, Users, Ratio, Image } from 'lucide-react';

import { FooterNavUser } from '@/components/SideBar/footer-nav';
import { NavMain } from '@/components/SideBar/main-nav';
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useSelector } from 'react-redux';
import { getItem } from '@/utils/storage';

export function MainSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const authState: any = useSelector((state: any) => state.authState);
  const appState: any = useSelector((state: any) => state.appState);
  const shop: any = getItem('SHOP_TENANT');
  const { logo, media } = appState;
  // console.log('authState', appState);

  const data = {
    user: {
      name: `${authState?.user?.firstName} ${authState?.user?.lastName}`,
      email: authState?.user?.email ?? '',
      avatar:
        authState?.user?.avatar ??
        `${authState?.user?.firstName?.charAt(0)}${authState?.user?.lastName?.charAt(0)}`,
    },
    navMain: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
        icon: SquareTerminal,
        items: [],
      },
      {
        title: 'Users',
        url: '#',
        icon: Users,
        items: [
          {
            title: 'Admin Users',
            url: '/admin/users/admin-users',
          },
          {
            title: 'Employees',
            url: '/admin/users/employees',
          },
        ],
      },
      {
        title: 'Roles & permissions',
        url: '/admin/role-permissions',
        icon: Ratio,
        items: [],
      },
      {
        title: 'Operations',
        url: '#',
        icon: Users,
        items: [
          {
            title: 'Categories',
            url: '/dashboard/operations/categories',
          },
          {
            title: 'Reports',
            url: '/dashboard/operations/reports',
          },
        ],
      },
      {
        title: 'Settings',
        url: '#',
        icon: Settings2,
        items: [
          {
            title: 'Panel Settings',
            url: '/dashboard/setting/panel-settings',
          },
          // {
          //   title: 'System Configuration',
          //   url: '/dashboard/setting/system-configuration',
          // },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center my-2">
        <img
          src={shop ? shop.logo : logo ? logo : <Image size={20} />}
          className="max-w-[100px]"
        />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="my-3">
        <FooterNavUser
          media={shop ? shop?.media : media ? media : {}}
          user={data.user}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
