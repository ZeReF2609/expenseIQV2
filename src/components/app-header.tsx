'use client';

import { Bell, Search, AlertCircle, FileText, BadgeCent, User, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { userProfile, notifications } from "@/lib/data";
import { useTranslation } from "@/hooks/use-translation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { formatDistanceToNow } from 'date-fns';
import { es, pt } from 'date-fns/locale';
import { cn } from "@/lib/utils";
import Link from "next/link";
import { AppLogo } from "./ui/app-logo";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { AppSidebar } from "./app-sidebar";
import { useState } from "react";

const localeMap = {
    en: undefined,
    es: es,
    pt: pt,
}

export function AppHeader() {
    const { t, language } = useTranslation();
    const unreadCount = notifications.filter(n => !n.read).length;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getIconForNotification = (title: string) => {
        const lowerCaseTitle = title.toLowerCase();
        if (lowerCaseTitle.includes('budget')) return <AlertCircle className="h-5 w-5 text-destructive" />;
        if (lowerCaseTitle.includes('report')) return <FileText className="h-5 w-5 text-blue-500" />;
        if (lowerCaseTitle.includes('expense')) return <BadgeCent className="h-5 w-5 text-green-500" />;
        if (lowerCaseTitle.includes('login')) return <User className="h-5 w-5 text-yellow-500" />;
        return <Bell className="h-5 w-5 text-muted-foreground" />;
      }

    return (
        <header className="flex items-center justify-between border-b border-surface-border bg-card/95 backdrop-blur px-6 py-4 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="lg:hidden text-foreground">
                            <Menu />
                            <span className="sr-only">Toggle Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-72 bg-card border-r-0">
                        <SheetHeader className="sr-only">
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>
                        <AppSidebar />
                    </SheetContent>
                </Sheet>
                <div className="lg:hidden flex items-center gap-2">
                    <AppLogo className="size-6 text-primary" />
                </div>
            </div>

            <div className="flex-1 hidden lg:flex">
                <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input className="w-full bg-surface border-surface-border rounded-lg py-2 pl-10 pr-4 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-muted-foreground/60" placeholder={t('header.searchPlaceholder')} type="text"/>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent">
                            <Bell className="h-5 w-5"/>
                            {unreadCount > 0 && (
                                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background"></span>
                            )}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80 md:w-96">
                        <DropdownMenuLabel className="flex justify-between items-center">
                            <span>{t('notifications.title')}</span>
                            <span className="text-xs font-normal text-muted-foreground">{t('notifications.unread', {count: unreadCount.toString()})}</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="max-h-80 overflow-y-auto">
                            {notifications.slice(0, 4).map(notification => (
                                <DropdownMenuItem key={notification.id} className={cn("flex items-start gap-3 p-3 cursor-pointer", !notification.read && "bg-accent/50")}>
                                    {!notification.read && <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>}
                                    <div className={cn("flex-shrink-0", notification.read && "ml-[14px]")}>
                                        {getIconForNotification(notification.title)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-foreground">{t(`notifications.items.${notification.title.toLowerCase().replace(/ /g, '')}.title`)}</p>
                                        <p className="text-sm text-muted-foreground mt-0.5">{t(`notifications.items.${notification.title.toLowerCase().replace(/ /g, '')}.description`, {amount: '$50'})}</p>
                                        <p className="text-xs text-muted-foreground mt-2">
                                            {formatDistanceToNow(new Date(notification.date), { addSuffix: true, locale: localeMap[language] })}
                                        </p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild className="justify-center text-sm font-medium text-primary hover:!text-primary cursor-pointer">
                            <Link href="/notifications">{t('notifications.viewAll')}</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="h-8 w-px bg-surface-border mx-2"></div>
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{userProfile.name}</p>
                        <p className="text-xs text-muted-foreground">{t('profile.role')}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-border border overflow-hidden">
                        <Image src={userProfile.avatarUrl} alt={userProfile.name} width={40} height={40} className="object-cover" />
                    </div>
                </div>
            </div>
        </header>
    )
}
