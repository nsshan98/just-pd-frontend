"use client";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/atoms/dialog";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import { useCreateEmployee } from "@/hooks/reactQuery/employeeQuery";
import { employeeSchema, EmployeeSchemaType } from "@/zod/employee-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../atoms/form";

export default function AddEmployeeDialog() {
  const { employeeCreateMutation } = useCreateEmployee();
  const employeeCreateForm = useForm<EmployeeSchemaType>({
    defaultValues: {
      image: "",
      name: "",
      email: "",
      show_email: true,
      phone: "",
      show_phone: true,
      designation: "",
      department: "",
      sorting_order: 0,
      is_published: true,
    },
    resolver: zodResolver(employeeSchema),
  });

  const getFormData = (data: EmployeeSchemaType) => {
    const formData = new FormData();
    if (data.image) {
      formData.append("image", data.image);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("show_email", (data.show_email ?? true).toString());
    formData.append("phone", data.phone);
    formData.append("show_phone", (data.show_phone ?? true).toString());
    formData.append("designation", data.designation);
    formData.append("department", data.department);
    formData.append("sorting_order", (data.sorting_order ?? 0).toString());
    formData.append("is_published", (data.is_published ?? true).toString());
    return formData;
  };

  const onSubmit = (data: EmployeeSchemaType) => {
    const formData = getFormData(data);

    employeeCreateMutation.mutate(formData, {
      onSuccess: () => {
        toast("Employee Created Successfully");
      },
      onError: (error: Error) => {
        if (isAxiosError(error)) {
          console.log(error);
        }
      },
    });
    console.log(data);
  };

  console.log(employeeCreateForm.formState.errors);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Employee</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Add Employee Form</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new employee to the directory.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Form {...employeeCreateForm}>
              <form
                onSubmit={employeeCreateForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={employeeCreateForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-amber-50 border-amber-950"
                          placeholder="John Doe"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={employeeCreateForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-amber-50 border-amber-950"
                          placeholder="example@email.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={employeeCreateForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-amber-50 border-amber-950"
                          placeholder="+88 01234 567890"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-row gap-2">
                  <FormField
                  control={employeeCreateForm.control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Designation</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-amber-50 border-amber-950"
                          placeholder="+88 01234 567890"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={employeeCreateForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <FormControl>
                        <Input
                          className="bg-amber-50 border-amber-950"
                          placeholder="+88 01234 567890"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </div>
                <DialogFooter>
                  <Button type="submit">Submit</Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
