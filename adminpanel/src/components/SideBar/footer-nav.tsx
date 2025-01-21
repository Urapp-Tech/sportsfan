'use client';
import { ChevronsUpDown, LogOut, User2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Facebook,
  Instagram,
  PhoneCall,
  Linkedin,
  Loader2,
  Twitter,
  Youtube,
} from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';

export function FooterNavUser({
  user,
  media,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  media: any;
}) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleSocialLinks = () => {
    const socialMediaMap = {
      facebook: <Facebook size={20} />,
      instagram: <Instagram size={20} />,
      twitter: <Twitter size={20} />,
      whatsapp: <PhoneCall size={20} />,
      linkedin: <Linkedin size={20} />,
      youtube: <Youtube size={20} />,
    };
    const logosToShow = [];
    for (const [key, logo] of Object.entries(socialMediaMap)) {
      if (media?.[key]) {
        logosToShow.push(logo);
      }
    }
    if (logosToShow.length === 0) {
      console.log('No social media links found');
      return null;
    }
    return (
      <div className="flex gap-2 p-1">
        {logosToShow?.map((logo, index) => (
          <span key={index} className="cursor-pointer">
            {logo}
          </span>
        ))}
      </div>
    );
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="outline-none border-0 focus:outline-none focus:border-none focus-visible:ring-offset-0 focus-visible:ring-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {handleSocialLinks()}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>
                <User2 />
                View Profile
              </DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuItem onClick={() => logoutHandler()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
