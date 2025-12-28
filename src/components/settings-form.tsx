'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useTranslation, type Language } from '@/hooks/use-translation';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Languages, Palette, Tag, Plus, X } from 'lucide-react';

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark', 'system']),
  language: z.enum(['en', 'es', 'pt']),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

export function SettingsForm() {
  const { theme, setTheme } = useTheme();
  const { t, language, setLanguage } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      theme: 'dark',
      language: language,
    },
  });
  
  useEffect(() => {
    setMounted(true);
    if(theme) {
        form.reset({ 
            theme: (theme as SettingsFormValues['theme']),
            language: language,
           });
    }
  }, [theme, language, form]);
  
  function onSubmit(data: SettingsFormValues) {
    setTheme(data.theme);
    setLanguage(data.language as Language);
    toast({
      title: t('settings.toast.title'),
      description: t('settings.toast.description'),
    });
  }

  if (!mounted) {
    return null; 
  }

  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="rounded-xl bg-card border p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Palette className="h-5 w-5"/>
                </div>
                <h3 className="text-lg font-bold text-foreground">{t('settings.appearance.title')}</h3>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface border mb-4">
                <div className="flex flex-col gap-1">
                    <span className="text-foreground font-medium">{t('settings.appearance.darkMode')}</span>
                    <span className="text-muted-foreground text-sm">{t('settings.appearance.darkModeDescription')}</span>
                </div>
                <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <Switch
                            checked={field.value === 'dark'}
                            onCheckedChange={(checked) => {
                                const newTheme = checked ? 'dark' : 'light';
                                field.onChange(newTheme);
                                setTheme(newTheme);
                            }}
                            aria-label="Toggle dark mode"
                            />
                        </FormControl>
                        </FormItem>
                    )}
                    />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface border">
                <div className="flex flex-col gap-1">
                    <span className="text-foreground font-medium">{t('settings.language.label')}</span>
                    <span className="text-muted-foreground text-sm">{t('settings.appearance.languageDescription')}</span>
                </div>
                <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                    <FormItem>
                    <Select onValueChange={(value: Language) => {
                        field.onChange(value);
                        setLanguage(value);
                    }} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="w-[180px] bg-card text-foreground">
                            <SelectValue placeholder={t('settings.language.placeholder')} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="en">{t('settings.language.en')}</SelectItem>
                        <SelectItem value="es">{t('settings.language.es')}</SelectItem>
                        <SelectItem value="pt">{t('settings.language.pt')}</SelectItem>
                        </SelectContent>
                    </Select>
                    </FormItem>
                )}
                />
                </div>
            </div>
            <div className="rounded-xl bg-card border p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <Tag className="h-5 w-5"/>
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{t('settings.financialCategories.title')}</h3>
                </div>
                <p className="text-muted-foreground text-sm mb-6">{t('settings.financialCategories.description')}</p>
                
            </div>
            <div className="flex justify-end gap-4 pt-4 border-t border-border/50">
                <Button type="button" variant="outline" className="px-6 py-2.5 rounded-lg text-muted-foreground font-medium hover:bg-accent transition-colors">
                    {t('profile.cancelButton')}
                </Button>
                <Button type="submit" className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all transform active:scale-95">
                    {t('profile.saveButton')}
                </Button>
            </div>
        </form>
    </Form>
  );
}
