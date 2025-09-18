"use client";
import { Card, CardContent } from "@/components/atoms/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/atoms/avatar";
import { Skeleton } from "@/components/atoms/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { Button } from "@/components/atoms/button";
import { Phone, Mail, EllipsisVertical, SquarePen, Trash } from "lucide-react";
import { useShowEmployee } from "@/hooks/reactQuery/employeeQuery";
import Link from "next/link";
import { useState } from "react";
import { Employee } from "@/zod/employee-schema";
import EditEmployeeDialog from "./edit-employee";
import DeleteEmployeeDialog from "./delete-employee";

export function ProfileCard() {
  const [selectedEmployee, setSelectedEmployee] = useState<{
    employee_id: string;
    openState: "edit" | "delete" | null;
  }>({ employee_id: "", openState: null });
  const [openModal, setOpenModal] = useState(false);

  const { employeeShowQuery } = useShowEmployee();

  const employee = employeeShowQuery.data?.data.find(
    (emp: Employee) => emp.id === selectedEmployee.employee_id
  );

  const handleOpenEmployeeEditModal = (employee: Employee) => {
    setSelectedEmployee({
      employee_id: employee.id,
      openState: "edit",
    });
    setOpenModal(true);
  };

  const handleOpenEmployeeDeleteModal = (employee: Employee) => {
    setSelectedEmployee({
      employee_id: employee.id,
      openState: "delete",
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedEmployee({ employee_id: "", openState: null });
  };

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
        <Card key={index} className="w-full bg-white shadow-sm relative">
          <CardContent className="p-2 text-center">
            <div className="flex flex-col items-center space-y-4">
              {/* Profile Avatar */}
              <Avatar className="w-40 h-40">
                <AvatarImage
                  src={employee.image?.image_url}
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
                <p className="text-gray-600">{employee.designation}</p>
                <p className="text-gray-600">({employee.department})</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 ">
                <div className="flex items-center justify-center space-x-3 text-gray-600">
                  <Link
                    href={`tel:${employee.official_phone}`}
                    className="flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">
                      {employee.official_phone ?? "Not Provided"} (Official)
                    </span>
                  </Link>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600">
                  <Link
                    href={`tel:${employee.personal_phone}`}
                    className="flex items-center space-x-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">
                      {employee.personal_phone ?? "Not Provided"} (Personal)
                    </span>
                  </Link>
                </div>
                <div className="flex items-center justify-center space-x-3 text-gray-600">
                  <Link
                    href={`mailto:${employee.email}`}
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">
                      {employee.email ?? "Not Provided"}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>

          <div className="absolute top-2 right-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size={"icon"} variant="ghost">
                  <EllipsisVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      handleOpenEmployeeEditModal(employee);
                      setOpenModal(true);
                    }}
                  >
                    <SquarePen className="w-4 h-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleOpenEmployeeDeleteModal(employee);
                      setOpenModal(true);
                    }}
                  >
                    <Trash className="w-4 h-4 text-red-500" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Card>
      ))}

      {selectedEmployee && selectedEmployee?.openState === "edit" && (
        <EditEmployeeDialog
          employee={employee as Employee}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}

      {selectedEmployee && selectedEmployee?.openState === "delete" && (
        <DeleteEmployeeDialog
          employeeId={employee.id as string}
          open={openModal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
