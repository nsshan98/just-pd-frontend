"use client";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "../../../public/just-logo.png";
import Link from "next/link";
import SearchBox from "@/components/shared/search-box";
import { useShowEmployeeBySearch } from "@/hooks/reactQuery/employeeQuery";
import { Employee } from "@/zod/employee-schema";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Mail, Phone, Info } from "lucide-react";
import { Card, CardContent } from "../atoms/card";
import BottomNav from "../shared/bottom-navigation";
import { Alert, AlertTitle } from "../atoms/alert";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { employeeShowBySearchQuery } = useShowEmployeeBySearch();

  const inputRef = useRef<HTMLInputElement>(null);

  // Keep focus after each render
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Optional: move cursor to the end
      inputRef.current.selectionStart = inputRef.current.value.length;
      inputRef.current.selectionEnd = inputRef.current.value.length;
    }
  }, [searchTerm]); // rerun every time searchTerm changes

  const filteredEmployee = useMemo(() => {
    return employeeShowBySearchQuery.data?.data?.filter(
      (employee: Employee) => {
        const matchesName = (employee.name ?? "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesName;
      }
    );
  }, [employeeShowBySearchQuery.data, searchTerm]);

  return (
    <div className="min-h-screen flex flex-col items-center relative">
      {/* Top SearchBox container */}

      {searchTerm && (
        <div
          className={`transition-all duration-300 ${
            searchTerm ? "mt-2 py-4 order-first" : "mt-2 py-4 order-last"
          }`}
        >
          <SearchBox
            ref={inputRef}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
          />
        </div>
      )}

      {searchTerm ? (
        // Results
        <div className="flex-1 w-full px-3">
          {employeeShowBySearchQuery.isLoading ||
          employeeShowBySearchQuery.isFetching ? (
            <p className="text-center">Loading...</p>
          ) : filteredEmployee && filteredEmployee.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-3">
              {filteredEmployee.map((employee: Employee, index: number) => (
                <Card
                  key={index}
                  className="w-full bg-white shadow-sm relative"
                >
                  <CardContent className="p-1 text-center">
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

                      {/* Name and Title */}
                      <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-gray-900">
                          {employee.name}
                        </h2>
                        <p className="text-gray-600">{employee.designation}</p>
                        <p className="text-gray-600">{employee.department}</p>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-center space-x-3 text-gray-600">
                          <Link
                            href={`tel:${employee.official_phone}`}
                            className="flex items-center space-x-2"
                          >
                            <Phone className="w-4 h-4" />
                            <span className="text-sm">
                              {employee.official_phone ?? "Not Provided"}{" "}
                              (Official)
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
                              {employee.personal_phone ?? "Not Provided"}{" "}
                              (Personal)
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
            <Alert variant={"info"}>
              <Info />
              <AlertTitle>No results found for {searchTerm}</AlertTitle>
            </Alert>
          )}
        </div>
      ) : (
        // Logo + text + OR (SearchBox stays same, just visually below)
        <div className="flex flex-col items-center justify-center flex-1 px-3 pb-20">
          <Image src={logo} alt="logo" width={300} height={300} priority />
          <p className="text-2xl font-bold text-center">
            Contact Number & Details
          </p>

          <div className="flex flex-col mt-6 space-y-2">
            <div className="flex flex-col items-center space-y-6">
              <div className="flex flex-row items-center gap-2 w-full max-w-xs">
                <Link
                  href="/departments"
                  className="px-4 py-2 bg-[#16DFE4] text-lg text-gray-950 font-semibold rounded flex-1 text-center"
                >
                  Department
                </Link>

                {/* Vertical separator */}
                <div className="w-px h-9 bg-blue-800" />

                <Link
                  href="/offices"
                  className="px-4 py-2 bg-[#D6EB4E] text-lg text-gray-950 font-semibold rounded flex-1 text-center"
                >
                  Office
                </Link>
              </div>

              <SearchBox
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>

          <BottomNav />
        </div>
      )}
    </div>
  );
};

export default Home;
