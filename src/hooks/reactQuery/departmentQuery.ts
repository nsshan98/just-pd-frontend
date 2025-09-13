import { axiosClient } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

// ================================ Show Department ================================ //
const useShowDepartment = () => {
  const departmentShowQuery = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/employee/departments");
      return data;
    },
    retry: false,
    staleTime: 0,
  });
  return { departmentShowQuery };
};

// ================================ Show Department Wise Employee ================================ //
const useShowDepartmentWiseEmployee = (department: string) => {
  const departmentWiseEmployeeQuery = useQuery({
    queryKey: ["department-wise-employees"],
    queryFn: async () => {
      const { data } = await axiosClient.get(
        `/employee/department/${department}`
      );
      return data;
    },
    retry: false,
    staleTime: 0,
  });
  return { departmentWiseEmployeeQuery };
};

export { useShowDepartment, useShowDepartmentWiseEmployee };
