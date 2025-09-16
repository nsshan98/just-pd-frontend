"use client";
import { Button } from "@/components/atoms/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/atoms/dialog";
import { Input } from "@/components/atoms/input";
import { useUpdateEmployee } from "@/hooks/reactQuery/employeeQuery";
import {
  Employee,
  employeeSchema,
  EmployeeSchemaType,
} from "@/zod/employee-schema";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../atoms/select";
import { employeeDepartments } from "@/lib/utils";
import { Checkbox } from "../atoms/checkbox";
import Image from "next/image";
import { useRef, useState } from "react";
import { X } from "lucide-react";

type EditEmployeeProps = {
  open: boolean;
  onClose: () => void;
  employee: Employee;
};

export default function EditEmployeeDialog({
  open,
  onClose,
  employee,
}: EditEmployeeProps) {
  const [previewImage, setPreviewImage] = useState<string | null>();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const { employeeUpdateMutation } = useUpdateEmployee(employee.id);

  const employeeCreateForm = useForm<EmployeeSchemaType>({
    values: {
      image: employee.image?.image_url,
      name: employee.name,
      email: employee.email,
      show_email: employee.show_email,
      phone: employee.phone,
      show_phone: employee.show_phone,
      designation: employee.designation,
      department: employee.department,
      sorting_order: employee.sorting_order ?? 0,
      is_published: employee.is_published,
    },
    resolver: zodResolver(employeeSchema),
  });

  const isFieldChange = (
    data: EmployeeSchemaType,
    employee: Omit<Employee, "employee.id">
  ) => {
    if (data.image instanceof File) return true;
    if (data.name !== employee.name) return true;
    if (data.email !== employee.email) return true;
    if (data.show_email !== employee.show_email) return true;
    if (data.phone !== employee.phone) return true;
    if (data.show_phone !== employee.show_phone) return true;
    if (data.designation !== employee.designation) return true;
    if (data.department !== employee.department) return true;
    if (data.sorting_order !== employee.sorting_order) return true;
    if (data.is_published !== employee.is_published) return true;
    return false;
  };

  const getFormData = (data: EmployeeSchemaType, employee: Employee) => {
    const formData = new FormData();

    if (data.image instanceof File) {
      formData.append("image", data.image);
    }

    if (data.name !== employee.name) {
      formData.append("name", data.name);
    }
    if (data.email !== employee.email) {
      formData.append("email", data.email);
    }
    if (data.show_email !== employee.show_email) {
      formData.append("show_email", (data.show_email ?? true).toString());
    }
    if (data.phone !== employee.phone) {
      formData.append("phone", data.phone);
    }
    if (data.show_phone !== employee.show_phone) {
      formData.append("show_phone", (data.show_phone ?? true).toString());
    }
    if (data.designation !== employee.designation) {
      formData.append("designation", data.designation);
    }
    if (data.department !== employee.department) {
      formData.append("department", data.department);
    }
    if (data.sorting_order !== employee.sorting_order) {
      formData.append("sorting_order", (data.sorting_order ?? 0).toString());
    }
    if (data.is_published !== employee.is_published) {
      formData.append("is_published", (data.is_published ?? true).toString());
    }
    return formData;
  };

  const onSubmit = async (data: EmployeeSchemaType) => {
    const formData = getFormData(data, employee);
    if (!isFieldChange(data, employee)) {
      toast.info("No change detected");
      return;
    }

    employeeUpdateMutation.mutate(formData, {
      onSuccess: () => {
        toast("Employee Updated Successfully");
      },
      onError: (error: Error) => {
        if (isAxiosError(error)) {
          console.log(error);
        }
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Add Employee</Button>
      </DialogTrigger> */}
      <DialogContent
        className="sm:max-w-[425px] overflow-y-auto max-h-[90vh]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Update Employee Form</DialogTitle>
          <DialogDescription>
            Fill the form below to update the employee details.
          </DialogDescription>
        </DialogHeader>

        <Form {...employeeCreateForm}>
          <form
            onSubmit={employeeCreateForm.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={employeeCreateForm.control}
              name="image"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div>
                      <input
                        type="file"
                        hidden
                        accept="image/jpg, image/jpeg, image/png, image/heic"
                        ref={fileRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setPreviewImage(URL.createObjectURL(file));
                            onChange(file);
                          }
                        }}
                      />

                      <div
                        onClick={() => fileRef.current?.click()}
                        style={{
                          width: 130,
                          height: 130,
                          border: "2px dashed #ccc",
                          borderRadius: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          position: "relative",
                          overflow: "hidden",
                          marginTop: 1,
                        }}
                      >
                        {previewImage ? (
                          <div>
                            <Image
                              src={previewImage}
                              alt="Preview"
                              layout="fill"
                              objectFit="cover"
                            />
                            <Button
                              variant={"ghost"}
                              size="icon"
                              onClick={(e) => {
                                e.stopPropagation(); // prevent triggering file dialog
                                setPreviewImage(null);
                                onChange(undefined);
                                if (fileRef.current) {
                                  fileRef.current.value = "";
                                }
                              }}
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                backgroundColor: "#000",
                                color: "#fff",
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                padding: 0,
                              }}
                            >
                              <X fontSize="small" />
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Image
                              src={
                                employee?.image?.image_url ??
                                "/product-placeholder.png"
                              }
                              alt="Upload"
                              width={130}
                              height={130}
                              priority
                              style={{ objectFit: "contain" }}
                            />
                            <Button
                              type="button"
                              variant={"ghost"}
                              size="icon"
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                                backgroundColor: "#000",
                                color: "#fff",
                                width: 24,
                                height: 24,
                                borderRadius: "50%",
                                padding: 0,
                              }}
                            >
                              <X fontSize="small" />
                            </Button>
                          </div>
                        )}
                      </div>
                      {/* 
                {error && (
                  <Typography color="error" variant="caption" mt={1}>
                    {error.message}
                  </Typography>
                )} */}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            <div className="flex items-center gap-2">
              <div className="flex-grow">
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
              </div>
              <FormField
                control={employeeCreateForm.control}
                name="show_email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Show</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value} // ✅ bind to form state
                        onCheckedChange={field.onChange} // ✅ update form state
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow">
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
              </div>
              <FormField
                control={employeeCreateForm.control}
                name="show_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Show</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value} // ✅ bind to form state
                        onCheckedChange={field.onChange} // ✅ update form state
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <FormField
                  control={employeeCreateForm.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-60 sm:w-72 border-black">
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employeeDepartments.map((dept) => (
                            <SelectItem key={dept.id} value={dept.value}>
                              {dept.value}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={employeeCreateForm.control}
                name="sorting_order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-amber-50 border-amber-950"
                        placeholder="1"
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        min={0}
                        onChange={(e) => field.onChange(Number(e.target.value))} // manually handle number conversion
                        value={field.value ?? ""} // handle undefined
                        // {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="flex justify-between">
              <FormField
                control={employeeCreateForm.control}
                name="is_published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center">
                    <FormLabel>Publish</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value} // ✅ bind to form state
                        onCheckedChange={field.onChange} // ✅ update form state
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
