
"use client";
import type { ReactNode } from 'react';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarFooter, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { SiteHeader } from './site-header';
import { NavMenu } from './nav-menu';
import { Toaster } from '@/components/ui/toaster'; // Import Toaster
import { Button } from '../ui/button';
import { LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

export function SiteLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  return (
    <SidebarProvider defaultOpen>
      <Sidebar variant="sidebar" collapsible="icon" className="border-r">
        <SidebarHeader className="p-4 flex items-center justify-between">
           <Link href="/" className="flex items-center gap-2">
            {/* You can put a smaller logo/icon here for collapsed sidebar if needed */}
            <span className="font-bold text-lg group-data-[collapsible=icon]:hidden">ShopSimple</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <NavMenu />
        </SidebarContent>
        <SidebarFooter className="p-2">
          {/* Optional: Footer content for sidebar, e.g., settings or user profile quick access */}
          {!loading && !user && (
             <Button variant="outline" className="w-full group-data-[collapsible=icon]:hidden" asChild>
                <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4"/> Login
                </Link>
            </Button>
          )}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 bg-background">
          {children}
        </main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
