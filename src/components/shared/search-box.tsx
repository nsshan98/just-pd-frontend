"use client";

import * as React from "react";
import { CiSearch } from "react-icons/ci";
import { Input } from "@/components/atoms/input";

interface SearchBoxProps {
  ref?: React.Ref<HTMLInputElement>;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export default function SearchBox({
  ref,
  value,
  onChange,
  placeholder,
}: SearchBoxProps) {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg px-3 w-full">
      <CiSearch size={20} className="text-gray-500 mr-2" />
      <Input
        type="text"
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none p-0 flex-1"
      />
    </div>
  );
}
