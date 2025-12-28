'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { categories as initialCategories } from '@/lib/data';
import * as Lucide from 'lucide-react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { Category } from '@/lib/types';
import { toast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryColor, setNewCategoryColor] = useState('#d50000');
  const { t } = useTranslation();

  const handleAddCategory = () => {
    if (!newCategoryName) {
        toast({
            variant: 'destructive',
            title: t('categories.errorTitle'),
            description: t('categories.errorDescription'),
        });
        return;
    }
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name: newCategoryName,
      color: newCategoryColor,
      icon: 'Shapes', // Default icon
    };
    setCategories(prev => [...prev, newCategory]);
    setNewCategoryName('');
    setNewCategoryColor('#d50000');
    toast({
        title: t('categories.successTitle'),
        description: t('categories.successDescriptionAdd', { categoryName: newCategory.name }),
    });
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    toast({
        title: t('categories.successTitle'),
        description: t('categories.successDescriptionDelete'),
      });
  };

  return (
    <div className="flex-1 overflow-y-auto bg-background p-4 lg:p-8 pb-24">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
            <div className="flex flex-col gap-1 mb-2">
                <h1 className="text-3xl font-bold text-foreground tracking-tight">{t('categories.title')}</h1>
                <p className="text-muted-foreground text-base">{t('categories.manageCategories')}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('categories.yourCategories')}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-accent/50">
                                        <TableHead className="text-muted-foreground">{t('categories.name')}</TableHead>
                                        <TableHead className="text-muted-foreground">{t('categories.icon')}</TableHead>
                                        <TableHead className="text-muted-foreground">{t('categories.color')}</TableHead>
                                        <TableHead className="text-right text-muted-foreground">{t('categories.actions')}</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {categories.map(category => {
                                        const Icon = category.icon ? Lucide[category.icon] as Lucide.LucideIcon: Lucide.Landmark;
                                        return (
                                            <TableRow key={category.id} className="hover:bg-accent/50">
                                                <TableCell className="font-medium text-foreground">{t(`categories.${category.name.toLowerCase()}`)}</TableCell>
                                                <TableCell>
                                                    <Icon className="h-5 w-5" style={{ color: category.color }} />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: category.color }}></div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteCategory(category.id)} className="text-muted-foreground hover:text-foreground hover:bg-accent">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t('categories.addNewCategory')}</CardTitle>
                            <CardDescription>{t('categories.createNewCategory')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-muted-foreground">{t('categories.categoryName')}</Label>
                                <Input 
                                    id="name" 
                                    placeholder={t('categories.categoryNamePlaceholder')}
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="bg-surface text-foreground placeholder:text-muted-foreground/60"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="color" className="text-muted-foreground">{t('categories.color')}</Label>
                                <Input 
                                    id="color" 
                                    type="color" 
                                    value={newCategoryColor}
                                    onChange={(e) => setNewCategoryColor(e.target.value)}
                                    className="p-1 h-10 bg-surface"
                                />
                            </div>
                            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={handleAddCategory}>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                {t('categories.addCategory')}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
