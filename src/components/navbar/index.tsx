"use client";

import Link from "next/link";
import { CircleUser, Menu, Search, BookOpenCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    path: "/books",
    title: "Books",
  },
  {
    path: "/members",
    title: "Members",
  },
  {
    path: "/authors",
    title: "Authors",
  },
  {
    path: "/book-status",
    title: "Books Status",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <BookOpenCheck className="h-12 w-12" />
          <span className="sr-only">Library Management System</span>
        </Link>
        {navLinks.map((link, ind) => {
          const isActive = pathname.startsWith(link.path);
          return (
            <Link
              key={link.path + ind}
              href={link.path}
              prefetch={true}
              className={`${
                isActive ? "text-foreground" : "text-muted-foreground"
              } transition-colors hover:text-foreground`}
            >
              {link.title}
            </Link>
          );
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <BookOpenCheck className="h-8 w-8" />
              <span className="sr-only">Library Management System</span>
            </Link>
            {navLinks.map((link, ind) => {
              const isActive = pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path + ind}
                  href={link.path}
                  prefetch={true}
                  className={`${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  } transition-colors hover:text-foreground`}
                >
                  {link.title}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
