import { z } from "zod";

export const buyerInfoSchema = z.object({
  name: z.string().min(1, "Buyer name is required"),
  contact: z.string().min(1, "Contact information is required"),
  address: z.string().optional(),
});

export const productItemSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Item name is required"),
  hsnSac: z.string().optional(),
  quantity: z.number().min(0.01, "Quantity must be greater than 0"),
  unit: z.string().min(1, "Unit is required"),
  pricePerUnit: z.number().min(0.01, "Price must be greater than 0"),
  amount: z.number().min(0),
});

export const receiptFormSchema = z.object({
  buyerInfo: buyerInfoSchema,
  items: z.array(productItemSchema).min(1, "At least one item is required"),
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  date: z.string().min(1, "Date is required"),
  received: z.number().min(0, "Received amount cannot be negative"),
});

export type ReceiptFormData = z.infer<typeof receiptFormSchema>;
export type BuyerInfoFormData = z.infer<typeof buyerInfoSchema>;
export type ProductItemFormData = z.infer<typeof productItemSchema>;
