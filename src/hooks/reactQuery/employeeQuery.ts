import { axiosClient } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

// ================================ Show Employees ================================ //
const useShowEmployee = () => {
  const employeeShowQuery = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      const { data } = await axiosClient.get('/employee/all-employees');
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
  return { employeeShowQuery };
};

export {useShowEmployee};