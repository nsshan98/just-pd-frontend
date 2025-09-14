"use client";
import { Card, CardContent } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";

import Link from "next/link";
import { useShowDepartment } from "@/hooks/reactQuery/departmentQuery";

export function AllDepartments() {
  const { departmentShowQuery } = useShowDepartment();

  if (departmentShowQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 py-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="w-full max-w-sm bg-white shadow-sm">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-5 w-3/4 mx-auto" />
                  <Skeleton className="h-4 w-1/2 mx-auto" />
                </div>
                <div className="space-y-2 w-full pt-2">
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                  <Skeleton className="h-4 w-2/3 mx-auto" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 py-3">
      {departmentShowQuery.data?.data.map(
        (department: string, index: number) => (
          <Card key={index} className="w-full bg-white shadow-sm relative">
            <CardContent className="p-2 text-center">
              <div className="flex flex-col items-center space-y-4">
                {/* Name and Title */}
                <div className="space-y-1">
                  <Link href={`/departments/${department}`}>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {department}
                    </h2>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
