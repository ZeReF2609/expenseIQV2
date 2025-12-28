'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLogo } from '@/components/app-logo';
import { useTranslation } from '@/hooks/use-translation';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full font-sans bg-black text-white selection:bg-primary selection:text-white">
      <div className="relative hidden w-0 flex-1 lg:block bg-background-dark">
        <Image
          src={PlaceHolderImages[0].imageUrl}
          alt={PlaceHolderImages[0].description}
          layout="fill"
          objectFit="cover"
          className="opacity-60 mix-blend-overlay"
          data-ai-hint={PlaceHolderImages[0].imageHint}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-[#1a0505]/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-16 z-10">
          <div className="mb-6 h-1 w-12 bg-primary"></div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white mb-4">
            Precision in every transaction.
          </h1>
          <p className="text-lg font-light text-gray-300 max-w-md">
            Experience the next generation of expense management with real-time analytics.
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-32 bg-black relative">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]"></div>
        <div className="mx-auto w-full max-w-sm lg:w-[420px] z-10">
          <div className="flex items-center gap-3 mb-10">
            <AppLogo className="h-8 w-8 text-primary" />
            <h2 className="text-white text-2xl font-bold tracking-tight">expenseIQ</h2>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-white">Secure Access</h2>
            <p className="mt-2 text-base font-normal text-gray-400">Welcome back. Please enter your details.</p>
          </div>
          
          <div className="space-y-8">
            <div className="relative">
              <Input className="peer block w-full border-0 border-b border-gray-700 bg-transparent px-0 py-3 text-base font-normal text-white placeholder-transparent focus:border-primary focus:outline-none focus:ring-0 transition-colors duration-300" id="email" placeholder="Email Address" type="email"/>
              <Label className="absolute left-0 top-3 -translate-y-7 scale-90 text-sm font-normal text-gray-400 transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-primary pointer-events-none" htmlFor="email">
                  Email Address
              </Label>
            </div>
            <div className="relative">
              <Input className="peer block w-full border-0 border-b border-gray-700 bg-transparent px-0 py-3 text-base font-normal text-white placeholder-transparent focus:border-primary focus:outline-none focus:ring-0 transition-colors duration-300 pr-10" id="password" placeholder="Password" type="password"/>
              <Label className="absolute left-0 top-3 -translate-y-7 scale-90 text-sm font-normal text-gray-400 transition-all duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500 peer-focus:-translate-y-7 peer-focus:scale-90 peer-focus:text-primary pointer-events-none" htmlFor="password">
                  Password
              </Label>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Checkbox id="remember-me" name="remember-me" className="h-4 w-4 rounded border-gray-700 bg-gray-900 text-primary focus:ring-primary/20 focus:ring-offset-0" />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm font-normal text-gray-400">Remember me</Label>
                </div>
                <div className="text-sm">
                    <Link href="/forgot-password" className="font-medium text-gray-400 hover:text-primary transition-colors">Forgot password?</Link>
                </div>
            </div>

            <Button className="flex w-full justify-center rounded-[12px] bg-primary px-4 py-3.5 text-sm font-bold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-300 transform active:scale-[0.98]" asChild>
              <Link href="/dashboard">Login</Link>
            </Button>
          </div>

          <div className="mt-10 border-t border-gray-800 pt-6">
            <p className="text-center text-sm font-normal text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-bold text-white hover:text-primary transition-colors ml-1">
                Sign up
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
