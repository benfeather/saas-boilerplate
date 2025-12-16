import { Icon, type IconifyIcon } from '@iconify/react'
import { Link } from '@tanstack/react-router'
import { Command } from '@workspace/common/ui/Command'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@workspace/common/ui/sidebar'
import { NavUser } from './nav-user'

type MenuItem = {
  icon: IconifyIcon | string
  title: string
  url: string
}

export default function AppSidebar({ user }: { user?: any }) {
  const items: MenuItem[] = [
    {
      icon: 'tabler:dashboard',
      title: 'Dashboard',
      url: '/dashboard',
    },
    {
      icon: 'tabler:users',
      title: 'Users',
      url: '/users',
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Command className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Acme Inc</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  render={
                    <Link to={item.url}>
                      <Icon icon={item.icon} />
                      <span>{item.title}</span>
                    </Link>
                  }
                />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {user && (
              <NavUser
                user={{
                  name: user.name,
                  email: user.email,
                  avatar: user.avatar,
                }}
              />
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
