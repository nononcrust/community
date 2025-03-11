"use client";

import { menu } from "@/configs/menu";
import { ROUTE } from "@/configs/route";
import { useAuth } from "@/features/auth/use-auth";
import { useSession } from "@/features/auth/use-session";
import { cn } from "@/lib/utils";
import * as DialogPrimitives from "@radix-ui/react-dialog";
import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  return (
    <header className="border-border bg-background sticky top-0 z-10 flex h-[56px] items-center border-b px-4 transition-colors">
      <DesktopNav />
      <MobileNav />
    </header>
  );
};

const MobileNav = () => {
  return (
    <div className="flex w-full justify-between md:hidden">
      <div />
      <MobileMenu />
    </div>
  );
};

const MobileMenu = () => {
  return (
    <DialogPrimitives.Root>
      <DialogPrimitives.Trigger aria-label="메뉴">
        <MenuIcon />
      </DialogPrimitives.Trigger>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay />
        <DialogPrimitives.Content className="bg-background fixed inset-0 z-50 flex flex-col">
          <DialogPrimitives.Title className="sr-only">메뉴</DialogPrimitives.Title>
          <DialogPrimitives.Description className="sr-only">메뉴</DialogPrimitives.Description>
          <div className="flex justify-end px-4 py-4">
            <DialogPrimitives.Close aria-label="닫기">
              <XIcon />
            </DialogPrimitives.Close>
          </div>
          <motion.nav
            initial={{ opacity: 0, transform: "translateY(-16px)" }}
            animate={{ opacity: 1, transform: "translateY(0)" }}
            className="scrollbar-hide flex flex-col overflow-y-auto p-4"
          >
            {menu.map((item) => (
              <MobileMenuItem key={item.href} title={item.title} href={item.href} />
            ))}
          </motion.nav>
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};

type MobileMenuItemProps = {
  title: string;
  href: string;
};

const MobileMenuItem = ({ title, href }: MobileMenuItemProps) => {
  return (
    <DialogPrimitives.Close asChild>
      <Link href={href} className="py-3 font-semibold">
        {title}
      </Link>
    </DialogPrimitives.Close>
  );
};

const DesktopNav = () => {
  const { session } = useSession();
  const { logout } = useAuth();

  return (
    <div className="hidden w-full justify-between md:flex">
      <div />
      <nav className="flex flex-1 justify-center gap-6">
        <NavItem title="커뮤니티" href="/posts" />
        <NavItem title="마이페이지" href="/mypage" />
      </nav>
      {!session && (
        <Link className="text-sm font-medium" href={ROUTE.AUTH.LOGIN}>
          로그인
        </Link>
      )}
      {session && (
        <button className="text-sm font-medium" onClick={logout}>
          로그아웃
        </button>
      )}
    </div>
  );
};

type NavItemProps = {
  title: string;
  href: string;
};

const NavItem = ({ title, href }: NavItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link className={cn("text-sm font-medium", isActive && "text-primary")} href={href}>
      {title}
    </Link>
  );
};
