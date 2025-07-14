"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";

import {
  Calculator,
  Grid2x2,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { SidebarTrigger, useSidebar } from "./ui/sidebar";

const NAV_LINKS = [
  { title: "Home", path: "/" },
  { title: "Blog", path: "/blog" },
  { title: "About", path: "/about" },
  { title: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { setTheme } = useTheme();
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="p-4 flex items-center justify-between">
      {/* LEFT */}
      <div className="flex items-center gap-8">
        {/* <SidebarTrigger /> */}
        {/* <Button variant="outline" onClick={toggleSidebar}>
        BTN
        
      </Button> */}
        <Menu onClick={toggleSidebar} />
        <div className="flex items-center gap-2 font-bold ">
          <Button variant="outline">
            <Grid2x2 />
            <Link href="/" className="text-xl ">
              Math Grid
            </Link>
          </Button>
        </div>
      </div>
      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* THEME MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/simplearyan.png" />
              <AvatarFallback>AR</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="" />
              User
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
