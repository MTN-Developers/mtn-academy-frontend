'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

export default function HomeSkeleton() {
  return (
    <div className="min-h-screen container  bg-gray-50">
      {/* Header Skeleton */}
      <header className="w-full bg-white border-b py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-9 w-64 rounded-md hidden sm:block" />
          </div>

          <nav className="flex items-center gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-14" />
            <Skeleton className="h-8 w-24 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Banner Skeleton */}
        <div className="relative rounded-lg overflow-hidden mb-8 bg-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between p-6">
            <div className="flex items-start gap-4">
              <Skeleton className="h-10 w-16 rounded-md" />
              <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-5 w-36" />
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <Skeleton className="h-10 w-28 rounded-md" />
              <Skeleton className="h-3 w-24 mt-1" />
            </div>
          </div>
          <div className="flex justify-center mt-2 mb-1">
            <div className="flex gap-1">
              {[1, 2, 3].map(dot => (
                <Skeleton key={dot} className="h-2 w-2 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Continue Learning Section Skeleton */}
        <section className="mb-10">
          <Skeleton className="h-7 w-40 mb-4" />
          <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <Skeleton className="w-full md:w-1/4 h-[150px]" />
              <div className="p-4 flex flex-col justify-between w-full md:w-3/4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-48" />
                </div>
                <div className="mt-4">
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                  <Skeleton className="h-1 w-full mb-2" />
                  <Skeleton className="h-9 w-28 rounded-md" />
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Recent Viewed Section Skeleton */}
        <section className="mb-10">
          <Skeleton className="h-7 w-36 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(item => (
              <CourseCardSkeleton key={item} />
            ))}
          </div>
        </section>

        {/* Get Started Section Skeleton */}
        <section>
          <Skeleton className="h-7 w-64 mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(item => (
              <CourseCardSkeleton key={item} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function CourseCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Skeleton className="w-full h-[150px]" />
        <div className="absolute top-2 left-2">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <CardContent className="p-3">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-3 w-full mt-2" />
        <Skeleton className="h-3 w-full mt-1" />
        <Skeleton className="h-3 w-2/3 mt-1" />
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-4 w-14" />
        </div>
        <div className="flex flex-col items-end">
          <Skeleton className="h-5 w-16 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardFooter>
    </Card>
  );
}
