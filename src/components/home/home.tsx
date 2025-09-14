"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import logo from "../../../public/just-logo.png";
import Link from "next/link";
import SearchBox from "@/components/shared/search-box";
import { useShowEmployee } from "@/hooks/reactQuery/employeeQuery";
import { Employee } from "@/zod/employee-schema";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Mail, Phone } from "lucide-react";
import { Card, CardContent } from "../atoms/card";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { employeeShowQuery } = useShowEmployee();

  const filteredEmployee = useMemo(() => {
    return employeeShowQuery.data?.data?.filter((employee: Employee) => {
      const matchesName = (employee.name ?? "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesName;
    });
  }, [employeeShowQuery.data, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      {/* Top SearchBox container */}

       <div
        className={`transition-all duration-300 ${
          searchTerm ? "mt-2 py-4 order-first" : "mt-0 absolute bottom-24 p-0 w-full flex justify-center"
        }`}
      >
        <SearchBox
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
      </div>

      {searchTerm ? (
        // Results
        <div className="flex-1 w-full px-3">
          {employeeShowQuery.isLoading || employeeShowQuery.isFetching ? (
            <p className="text-center">Loading...</p>
          ) : filteredEmployee && filteredEmployee.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3">
              {filteredEmployee.map((employee: Employee, index: number) => (
                <Card
                  key={index}
                  className="w-full bg-white shadow-sm relative"
                >
                  <CardContent className="p-2 text-center">
                    <div className="flex flex-col items-center space-y-4">
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

                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {employee.name}
                        </h2>
                        <p className="text-gray-600">
                          {employee.designation} ({employee.department})
                        </p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-3 text-gray-600">
                          <Link
                            href={`tel:${employee.phone}`}
                            className="flex items-center space-x-2"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">
                              {employee.phone ?? "Not Provided"}
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
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center">No results found.</p>
          )}
        </div>
      ) : (
        // Logo + text + OR (SearchBox stays same, just visually below)
        <div className="flex flex-col items-center justify-center flex-1 px-3">
          <Image src={logo} alt="logo" width={200} height={200} priority />
          <p className="text-2xl font-bold text-center">
            Jashore University of Science and Technology
          </p>
          <p className="text-lg font-bold text-center">
            JUST Family Contact Number & Details
          </p>

          <div className=" flex flex-col space-y-2 mt-4">
            <div className="flex flex-col items-center space-y-2 ">
              <Link
              href="/departments"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Click Here to See Contact List
            </Link>
            <span className="px-2 text-blue-600 text-sm font-bold">OR</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
