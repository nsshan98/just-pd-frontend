import { z } from "zod";

const fileSizeLimit = 5 * 1024 * 1024;

export const employeeSchema = z.object({
  image: z
    .union([
      z.string().optional(),
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpg", "image/jpeg", "image/png", "image/heic"].includes(
              file.type
            ),
          { message: "Invalid image file type." }
        )
        .refine((file) => file.size <= fileSizeLimit, {
          message: "File size should not exceed 5MB",
        }),
    ])
    .optional(),
  name: z
    .string()
    .min(1, { message: "Employee Name is required" })
    .max(50, { message: "Product Name should not exceed 50 characters" }),
  email: z.string().min(1, { message: "Email is required" }),
  show_email: z.boolean().optional(),
  phone: z.string().min(1, { message: "Phone number is required" }),
  show_phone: z.boolean().optional(),
  designation: z.string().min(1, { message: "Designation is required" }),
  department: z.string().min(1, { message: "Department is required" }),
  sorting_order: z.number().optional(),
  is_published: z.boolean().optional(),
});

export type EmployeeSchemaType = z.infer<typeof employeeSchema>;

export type Employee = {
  id: string;
  name: string;
  email: string;
  show_email: boolean;
  phone: string;
  show_phone: boolean;
  designation: string;
  department: string;
  sorting_order: number;
  is_published: boolean;
  image: {
    image_url: string;
    image_public_id: string;
  };
};
