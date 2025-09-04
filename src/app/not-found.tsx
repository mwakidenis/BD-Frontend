'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

import notFound from "../assets/notfound.webp"

export default function NotFoundPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <Card className="max-w-md w-full p-6">
        <CardHeader className="text-center">
          <Image src={notFound} alt='Not Found' height={500} width={500} />
          <CardTitle className="text-2xl font-bold text-red-600">Page Not Found</CardTitle>
          <p className="text-sm text-gray-500">Sorry, we couldn't find the page you're looking for.</p>
        </CardHeader>

        <CardContent className="pt-4">
          <Button className="w-full" onClick={() => router.push('/')}>
            Go Back Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
