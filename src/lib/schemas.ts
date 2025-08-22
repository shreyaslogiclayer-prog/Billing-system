import { z } from "zod";

export const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const productSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Product name is required"),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  quantity: z.number().int().min(1, "Quantity must be at least 1"),
});

export const receiptFormSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  businessPhone: z.string().regex(phoneRegex, "Invalid phone number format"),
  buyerName: z.string().min(1, "Customer name is required"),
  date: z.string().min(1, "Date is required"),
  products: z.array(productSchema).min(1, "At least one product is required"),
});
