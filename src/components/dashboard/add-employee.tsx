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
import { CloudUpload, X } from "lucide-react";

export default function AddEmployeeDialog() {
  const [previewImage, setPreviewImage] = useState<string | null>();
  const fileRef = useRef<HTMLInputElement | null>(null);

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

    // employeeCreateMutation.mutate(formData, {
    //   onSuccess: () => {
    //     toast("Employee Created Successfully");
    //   },
    //   onError: (error: Error) => {
    //     if (isAxiosError(error)) {
    //       console.log(error);
    //     }
    //   },
    // });
    console.log(data);
  };

  console.log(employeeCreateForm.formState.errors);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Employee</Button>
      </DialogTrigger>
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
          <DialogTitle>Add Employee Form</DialogTitle>
          <DialogDescription>
            Fill the form below to add a new employee to the directory.
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
              render={({ field: {onChange} }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                   <>
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
                        style={{ objectFit: "cover" }}
                        fill                        
                      />
                      <Button
                        variant="ghost"
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
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <CloudUpload style={{ fontSize: 30, color: "#aaa" }} />
                      <div
                        style={{
                          fontSize: 16,
                          color: "#aaa",
                          textAlign: "center",
                        }}
                      >
                        Upload Employee Image
                      </div>
                    </div>
                  )}
                </div>
{/* 
                {error && (
                  <Typography color="error" variant="caption" mt={1}>
                    {error.message}
                  </Typography>
                )} */}
              </>
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
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.name}
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
