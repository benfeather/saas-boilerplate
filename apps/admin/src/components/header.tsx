import { Link } from '@tanstack/react-router'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@workspace/ui/components/navigation-menu'
import { ThemeToggle } from '@workspace/ui/components/theme-toggle'

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
