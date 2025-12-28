'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { notifications as initialNotifications } from '@/lib/data';
import type { Notification } from '@/lib/types';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import * as Lucide from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { es, pt } from 'date-fns/locale';

const localeMap = {
    en: undefined,
    es: es,
    pt: pt,
}

const getIconForNotification = (title: string): React.ReactElement => {
    const lowerCaseTitle = title.toLowerCase();
    if (lowerCaseTitle.includes('budget')) return <Lucide.AlertCircle className="h-5 w-5 text-destructive" />;
    if (lowerCaseTitle.includes('report')) return <Lucide.FileText className="h-5 w-5 text-blue-500" />;
    if (lowerCaseTitle.includes('expense')) return <Lucide.BadgeCent className="h-5 w-5 text-green-500" />;
    if (lowerCaseTitle.includes('login')) return <Lucide.User className="h-5 w-5 text-yellow-500" />;
    return <Lucide.Bell className="h-5 w-5 text-muted-foreground" />;
}

export default function NotificationsPage() {
    const { t, language } = useTranslation();
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-8 pb-24">
            <div className="max-w-4xl mx-auto flex flex-col gap-6">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('notifications.title')}</h1>
                        <p className="text-muted-foreground text-base">{t('notifications.description')}</p>
                    </div>
                    {unreadCount > 0 && (
                        <Button variant="ghost" onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}>
                            {t('notifications.markAllAsRead')}
                        </Button>
                    )}
                </div>
                
                <div className="rounded-xl bg-card border overflow-hidden">
                    <div className="divide-y divide-border">
                        {notifications.map(notification => (
                            <div key={notification.id} className={cn("p-6 flex items-start gap-4 transition-colors", !notification.read && "bg-accent/50")}>
                                {!notification.read && <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>}
                                <div className={cn("flex-shrink-0", notification.read && "ml-4")}>
                                    {getIconForNotification(notification.title)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{t(`notifications.items.${notification.title.toLowerCase().replace(/ /g, '')}.title`)}</p>
                                            <p className="text-sm text-muted-foreground mt-0.5">{t(`notifications.items.${notification.title.toLowerCase().replace(/ /g, '')}.description`, {amount: '$50'})}</p>
                                        </div>
                                        {!notification.read && (
                                            <Button variant="link" size="sm" className="text-primary h-auto p-0" onClick={() => markAsRead(notification.id)}>
                                                {t('notifications.markAsRead')}
                                            </Button>
                                        )}
                                    </div>
                                     <p className="text-xs text-muted-foreground mt-2">
                                        {formatDistanceToNow(new Date(notification.date), { addSuffix: true, locale: localeMap[language] })}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {notifications.length === 0 && (
                        <div className="text-center py-12">
                            <Lucide.BellOff className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold text-foreground">{t('notifications.noNotifications.title')}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{t('notifications.noNotifications.description')}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
