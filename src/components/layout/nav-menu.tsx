
"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, ShoppingCart, Package, User, Settings, BotMessageSquare, PlusCircle, ListOrdered, ShieldCheck } from 'lucide-react';
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive?: (pathname: string) => boolean;
  adminOnly?: boolean;
  children?: NavItem[];
}

export function NavMenu() {
  const pathname = usePathname();
  const { user } = useAuth();
  const router = useRouter();

  const navItems: NavItem[] = [
    { href: '/', label: 'Products', icon: Home, isActive: (p) => p === '/' },
    { href: '/cart', label: 'Cart', icon: ShoppingCart },
    { href: '/orders', label: 'My Orders', icon: ListOrdered },
    {
      href: '/admin',
      label: 'Admin',
      icon: ShieldCheck,
      adminOnly: true,
      isActive: (p) => p.startsWith('/admin'),
      children: [
        { href: '/admin/ai-product-tool', label: 'AI Product Tool', icon: BotMessageSquare },
        { href: '/admin/products', label: 'Manage Products', icon: Package },
        { href: '/admin/products/new', label: 'Add Product', icon: PlusCircle },
        // Add more admin links here, e.g., view orders, manage inventory
      ],
    },
  ];

  const renderNavItem = (item: NavItem, isSubItem = false) => {
    if (item.adminOnly && (!user || user.role !== 'admin')) {
      return null;
    }

    const active = item.isActive ? item.isActive(pathname) : pathname.startsWith(item.href);
    const ButtonComponent = isSubItem ? SidebarMenuSubButton : SidebarMenuButton;
    const ItemComponent = isSubItem ? SidebarMenuSubItem : SidebarMenuItem;

    if (item.children && item.children.length > 0) {
      const visibleChildren = item.children.filter(child => !(child.adminOnly && (!user || user.role !== 'admin')));
      if (visibleChildren.length === 0 && item.adminOnly) return null; // Don't render parent if no visible children for admin item
      
      return (
        <ItemComponent key={item.href}>
          <ButtonComponent
            onClick={item.children ? undefined : () => router.push(item.href)}
            isActive={active}
            className={cn("w-full", { "font-semibold": active })}
            aria-current={active ? "page" : undefined}
            asChild={!item.children}
          >
            {item.children ? (
              <>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </>
            ) : (
              <Link href={item.href} className="flex items-center gap-2 w-full">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )}
          </ButtonComponent>
          {item.children && visibleChildren.length > 0 && (
            <SidebarMenuSub>
              {visibleChildren.map((child) => renderNavItem(child, true))}
            </SidebarMenuSub>
          )}
        </ItemComponent>
      );
    }
    
    return (
      <ItemComponent key={item.href}>
        <ButtonComponent
            onClick={() => router.push(item.href)}
            isActive={active}
            className={cn("w-full", { "font-semibold": active })}
            aria-current={active ? "page" : undefined}
            asChild
          >
            <Link href={item.href} className="flex items-center gap-2 w-full">
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
        </ButtonComponent>
      </ItemComponent>
    );
  };

  return (
    <SidebarMenu>
      {navItems.map((item) => renderNavItem(item))}
    </SidebarMenu>
  );
}
