"use client";
import { Card, CardContent } from "@/components/atoms/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";
import { Skeleton } from "@/components/atoms/skeleton";
import { Phone, Mail } from "lucide-react";
import { useShowEmployee } from "@/hooks/reactQuery/employeeQuery";
import Link from "next/link";

interface Employee {
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  image: {
    image_public_id: string;
    image_url: string;
  };
}

export function ProfileCard() {
  const { employeeShowQuery } = useShowEmployee();

  if (employeeShowQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3">
      {employeeShowQuery.data?.data.map((employee: Employee, index: number) => (
        <Card key={index} className="w-full bg-white shadow-sm">
          <CardContent className="p-2 text-center">
            <div className="flex flex-col items-center space-y-4">
              {/* Profile Avatar */}
              <Avatar className="w-40 h-40">
                <AvatarImage
                  src={employee.image.image_url}
                  alt={employee.name}
                  className="object-cover"
                />
                <AvatarFallback className="text-lg font-medium">
                  {employee.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              {/* Name and Title */}
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {employee.name}
                </h2>
                <p className="text-gray-600">{employee.designation} ({employee.department})</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 ">
                <div className="flex items-center justify-center space-x-3 text-gray-600">
                  <Link href={`tel:${employee.phone}`} className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{employee.phone ?? "Not Provided"}</span>
                  </Link>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600">
                  <Link href={`mailto:${employee.email}`} className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{employee.email ?? "Not Provided"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
