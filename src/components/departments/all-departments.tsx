"use client";
import { Card, CardContent } from "@/components/atoms/card";
import { Skeleton } from "@/components/atoms/skeleton";

import Link from "next/link";
import { useShowDepartment } from "@/hooks/reactQuery/departmentQuery";
import { Building, SquareArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function AllDepartments() {
  const router = useRouter();
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
        <SquareArrowLeft
          onClick={() => router.push("/")}
          style={{
            cursor: "pointer",
          }}
        />
        <h2 className="text-2xl font-bold text-center">All Department / Office</h2>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3 py-3">
        {departmentShowQuery.data?.data.map(
          (department: string, index: number) => {
            const departmentName = department.match(/^(.*)\s\((.*)\)$/);
            return (
              <Card key={index} className="w-full bg-white shadow-sm relative">
                <Link href={`/departments/${department}`}>
                  <CardContent className="p-2 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-gray-900 flex items-center justify-center ">
                          <Building className="w-6 h-6 inline-block mr-2" />
                          {departmentName?.[2] || department}
                        </h2>
                        <p>{departmentName?.[1]}</p>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          }
        )}
      </div>
    </div>
  );
}
