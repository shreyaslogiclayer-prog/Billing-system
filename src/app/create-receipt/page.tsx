"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Receipt,
  Building2,
  User,
} from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { receiptFormSchema } from "@/lib/schemas";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  buyerName: string;
  date: string;
  products: Product[];
}

type FormData = z.infer<typeof receiptFormSchema>;

export default function CreateReceipt() {
  const router = useRouter();

  // Initialize react-hook-form with zod resolver
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: {
      businessName: "",
      businessAddress: "",
      businessPhone: "",
      buyerName: "",
      date: new Date().toISOString().split("T")[0],
      products: [{ id: "1", name: "", price: 0, quantity: 1 }],
    },
  });

  // Setup field array for dynamic products
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });

  const addProduct = () => {
    append({
      id: `product-${fields.length + 1}-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      name: "",
      price: 0,
      quantity: 1,
    });
  };

  // Calculate total from watched values
  const products = watch("products");
  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const onSubmit = (data: FormData) => {
    localStorage.setItem("receiptData", JSON.stringify(data));
    router.push("/receipt-preview");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="p-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Create Receipt
            </h1>
            <p className="text-gray-600">Fill in the details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Business Information */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Business Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  {...register("businessName")}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    errors.businessName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Your Business Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("businessPhone")}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    errors.businessPhone ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <input
                  type="text"
                  {...register("businessAddress")}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    errors.businessAddress
                      ? "border-red-500"
                      : "border-gray-200"
                  }`}
                  placeholder="123 Business St, City, State 12345"
                />
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-magenta-400 to-magenta-600 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">
                Customer Information
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Customer Name
                </label>
                <input
                  type="text"
                  {...register("buyerName")}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    errors.buyerName ? "border-red-500" : "border-gray-200"
                  }`}
                  placeholder="Customer's Full Name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  {...register("date")}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                    errors.date ? "border-red-500" : "border-gray-200"
                  }`}
                />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  Products & Services
                </h2>
              </div>

              <button
                type="button"
                onClick={addProduct}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="relative grid md:grid-cols-4 gap-2 p-4 bg-gray-50 rounded-2xl border border-gray-200 animate-in slide-in-from-bottom-2 duration-300"
                >
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="absolute -right-2 px-3 p-2 text-red-500 hover:text-red-600 "
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Product/Service Name
                    </label>
                    <input
                      type="text"
                      {...register(`products.${index}.name`)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.products?.[index]?.name
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="Product or service name"
                    />
                    {errors.products?.[index]?.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.products[index]?.name?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Price (₹)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      {...register(`products.${index}.price`, {
                        valueAsNumber: true,
                      })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                        errors.products?.[index]?.price
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      placeholder="0.00"
                    />
                    {errors.products?.[index]?.price && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.products[index]?.price?.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Qty
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        {...register(`products.${index}.quantity`, {
                          valueAsNumber: true,
                        })}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all ${
                          errors.products?.[index]?.quantity
                            ? "border-red-500"
                            : "border-gray-200"
                        }`}
                        placeholder="1"
                      />
                      {errors.products?.[index]?.quantity && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.products[index]?.quantity?.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-purple-50 rounded-2xl border border-teal-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-teal-600">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-12 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Generate Receipt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
