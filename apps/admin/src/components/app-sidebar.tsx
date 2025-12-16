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

type MenuItem = {
  icon: IconifyIcon | string
  title: string
  url: string
}

export default function AppSidebar() {
  const items: MenuItem[] = [
    {
      icon: 'tabler:dashboard',
      title: 'Dashboard',
      url: '',
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              }
            />
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
        <div className="p-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} My Company
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
