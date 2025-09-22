import { axiosClient } from "@/lib/axios-client";
import { useQuery } from "@tanstack/react-query";

// ================================ Show Office ================================ //
const useShowOffice = () => {
  const officeShowQuery = useQuery({
    queryKey: ["offices"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/employee/offices");
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
  return { officeShowQuery };
};

// ================================ Show Office Wise Employee ================================ //
const useShowOfficeWiseEmployee = (office: string) => {
  const officeWiseEmployeeQuery = useQuery({
    queryKey: ["office-wise-employees"],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/employee/office/${office}`);
      return data;
    },
    retry: false,
    staleTime: 0,
  });
  return { officeWiseEmployeeQuery };
};

export { useShowOffice, useShowOfficeWiseEmployee };
