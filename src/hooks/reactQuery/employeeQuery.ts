import { axiosClient } from "@/lib/axios-client";
import { Employee } from "@/zod/employee-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

// ================================ Show Employees ================================ //
const useShowEmployee = () => {
  const employeeShowQuery = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/employee/all-employees");
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
  return { employeeShowQuery };
};

// ================================ Show Employee By Search ================================ //
const useShowEmployeeBySearch = () => {
  const employeeShowBySearchQuery = useQuery({
    queryKey: ["employee-search"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/employee/show-all-employees");
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
  return { employeeShowBySearchQuery };
};

// ===============================|| Create New Employee ||============================== //
const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  const employeeCreateMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await axiosClient.post("/employee/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["department-wise-employees"] });
    },
  });

  return { employeeCreateMutation };
};

// ===============================|| Update Employee ||============================== //
const useUpdateEmployee = (employeeId: string) => {
  const queryClient = useQueryClient();
  const employeeUpdateMutation = useMutation<Employee, AxiosError, FormData>({
    mutationFn: async (data: FormData) => {
      return await axiosClient.patch(`/employee/update/${employeeId}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["department-wise-employees"] });
    },
  });
  return { employeeUpdateMutation };
};

// ===============================|| Delete Employee ||============================== //
const useDeleteEmployee = () => {
  const queryClient = useQueryClient();
  const employeeDeleteMutation = useMutation({
    mutationFn: async (employeeId: string) => {
      return await axiosClient.delete(`/employee/delete/${employeeId}/`);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({ queryKey: ["department-wise-employees"] });
    },
  });
  return { employeeDeleteMutation };
};


export {
  useShowEmployee,
  useShowEmployeeBySearch,
  useCreateEmployee,
  useUpdateEmployee,
  useDeleteEmployee,
};
