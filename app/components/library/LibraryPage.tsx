'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card } from '@/components/ui/card';
// import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { dummyLines } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LibraryPage = () => {
  const { locale } = useParams();
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  const currentLine = dummyLines.find(line => line.id === selectedLine);
  const currentCourse = currentLine?.courses.find(c => c.id === selectedCourse);

  const coursesToShow = selectedLine ? currentLine?.courses ?? [] : dummyLines.flatMap(line => line.courses);

  const versionsToShow = currentCourse ? currentCourse.versions : coursesToShow.flatMap(course => course.versions);

  const filteredVersions = selectedYear ? versionsToShow.filter(v => v.year === selectedYear) : versionsToShow;

  const years = Array.from(new Set(versionsToShow.map(v => v.year)));

  const BreadCrumb = () => (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="mb-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">{locale === 'ar' ? 'الرئيسية' : 'Home'}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{locale === 'ar' ? 'المكتبة' : 'Library'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
      <div className="flex flex-col gap-3">
        <strong className="text-sm text-muted-foreground">Paths & Lines</strong>
        <Button
          variant={selectedLine === null ? 'default' : 'ghost'}
          className="justify-start"
          onClick={() => {
            setSelectedLine(null);
            setSelectedCourse(null);
          }}
        >
          All Paths & Lines
        </Button>
        {dummyLines.map(line => (
          <Button
            key={line.id}
            variant={line.id === selectedLine ? 'default' : 'ghost'}
            className="justify-start"
            onClick={() => {
              setSelectedLine(line.id);
              setSelectedCourse(null);
            }}
          >
            {line.name}
          </Button>
        ))}
        <hr />
        <strong className="text-sm text-muted-foreground">Courses</strong>
        {coursesToShow.map(course => (
          <Button
            key={course.id}
            variant={course.id === selectedCourse ? 'default' : 'ghost'}
            className="justify-start"
            onClick={() => setSelectedCourse(course.id)}
          >
            {course.name}
          </Button>
        ))}
        {/* <hr />
        <strong className="text-sm text-muted-foreground">Filter by Year</strong>
        {years.map(y => (
          <Button
            key={y}
            variant={selectedYear === y ? 'default' : 'ghost'}
            className="justify-start"
            onClick={() => setSelectedYear(y === selectedYear ? null : y)}
          >
            {y}
          </Button>
        ))} */}
      </div>

      <div>
        <BreadCrumb />
        {/* Top bar with title and year filter */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Paths & lines</h2>
          {years.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Sort by:</span>
              <Select
                onValueChange={val => setSelectedYear(val === 'all' ? null : parseInt(val))}
                defaultValue={selectedYear?.toString() ?? 'all'}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {years.map(year => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredVersions.map(v => (
            <Card key={v.id} className="rounded-xl p-4 shadow-md flex flex-col gap-2 hover:shadow-lg transition">
              <span className="text-xs bg-yellow-400 px-2 py-1 rounded-full w-fit font-bold text-white">Library</span>
              <img src="/images/example.jpg" alt="version" className="w-full h-32 object-cover rounded-md" />
              <h3 className="text-md font-semibold mt-2">Emotional literacy</h3>
              <p className="text-sm text-muted-foreground">
                Version: <strong>July, {v.year}</strong>
              </p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                It is a long established fact that a reader will be distracted by...
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-lg font-bold text-primary">${v.price}</span>
                <span className="text-red-500 text-sm font-semibold">%{v.discount} Discount</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
