"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Building, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/departments", label: "Department", icon: Building },
  { href: "/offices", label: "Office", icon: Building2 },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-md block lg:hidden">
      <ul className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <li key={item.href} className="w-full">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center py-2 text-sm transition-colors",
                  isActive
                    ? "text-[#149777]"
                    : "text-gray-500 hover:text-gray-800"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
