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
            <CardContent className="p-2 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="space-y-2 w-full pt-2">
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
    <div>
      <div className="flex items-center mx-auto justify-center gap-2 px-3 pt-3">
        <h2 className="text-2xl font-bold text-center">Faculty & Department</h2>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 py-3">
        {departmentShowQuery.data?.data.map(
          (department: string, index: number) => {
            const departmentName = department.match(/^(.*)\s\((.*)\)$/);
            return (
              <div key={index} className="w-full bg-white">
                <Link href={`/departments/${department}`}>
                  <div className="flex border h-[60px] border-gray-300 rounded-xl overflow-hidden">
                    {/* Left part (always fixed width) */}
                    <div className="w-14 px-6  bg-[#16DFE4] font-semibold text-gray-700 flex items-center justify-center border-r border-gray-300">
                      {departmentName?.[2] || department}
                    </div>

                    {/* Right part (flex-grow) */}
                    <div className="flex items-center flex-grow px-2 py-4 bg-[#D6EB4E] font-semibold text-gray-800">
                      {departmentName?.[1]}
                    </div>
                  </div>
                </Link>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
