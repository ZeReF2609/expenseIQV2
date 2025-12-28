'use client';

import { SettingsForm } from '@/components/settings-form';
import { userProfile } from '@/lib/data';
import { useTranslation } from '@/hooks/use-translation';
import { CheckCircle, Edit, Mail, Verified } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-8 pb-24">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-1 mb-2">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('profile.title')}</h1>
                <p className="text-muted-foreground text-base">{t('profile.description')}</p>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                <div className="xl:col-span-4 flex flex-col gap-6">
                    <div className="rounded-xl bg-card border p-6 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary-dark"></div>
                        <div className="flex flex-col items-center text-center">
                            <div className="relative mb-4">
                                <div className="h-28 w-28 rounded-full border-4 border-surface overflow-hidden bg-center bg-cover shadow-lg">
                                    <Image src={userProfile.avatarUrl} alt={userProfile.name} width={112} height={112} className="object-cover" />
                                </div>
                                <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors border-2 border-background">
                                    <Edit className="h-4 w-4"/>
                                </Button>
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-1">{userProfile.name}</h3>
                            <p className="text-muted-foreground text-sm font-medium mb-4">{t('profile.role')}</p>
                            <div className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-surface rounded-lg mb-6 border">
                                <Mail className="text-muted-foreground h-4 w-4" />
                                <span className="text-foreground/80 text-sm">{userProfile.email}</span>
                            </div>
                            <div className="w-full border-t border-border pt-4 grid grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{t('profile.roleLabel')}</span>
                                    <span className="text-foreground font-medium">{t('profile.adminRole')}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">{t('profile.memberSinceLabel')}</span>
                                    <span className="text-foreground font-medium">2021</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-card border p-6 shadow-sm">
                        <h4 className="text-foreground font-bold mb-4 flex items-center gap-2">
                            <Verified className="text-primary h-5 w-5" />
                            {t('profile.accountStatus.title')}
                        </h4>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">{t('profile.accountStatus.verification')}</span>
                                <span className="text-green-500 font-medium flex items-center gap-1"><CheckCircle className="h-4 w-4"/> {t('profile.accountStatus.completed')}</span>
                            </div>
                            <div className="w-full h-px bg-border"></div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">{t('profile.accountStatus.plan')}</span>
                                <span className="text-foreground font-medium">{t('profile.accountStatus.enterprisePlan')}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-8 flex flex-col gap-6">
                    <SettingsForm />
                </div>
            </div>
        </div>
    </div>
  );
}
