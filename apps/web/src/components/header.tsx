import { Link } from '@tanstack/react-router'
import { ThemeToggle } from '@workspace/common/components/theme-toggle'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@workspace/common/ui/navigation-menu'

export default function Header() {
  const links = [
    { to: '/', label: 'Home' },
    { to: '/dashboard', label: 'Dashboard' },
  ]

  return (
    <NavigationMenu className="w-full border-b bg-background/80 backdrop-blur-sm">
      <NavigationMenuList>
        {links.map(({ to, label }) => (
          <NavigationMenuItem key={to}>
            <NavigationMenuLink render={<Link to={to} />}>
              {label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
      <div className="mr-2 ml-auto">
        <ThemeToggle />
      </div>
    </NavigationMenu>
  )
}
