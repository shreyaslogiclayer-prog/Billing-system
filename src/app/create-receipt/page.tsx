"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ArrowLeft, Plus, Trash2, Calculator } from "lucide-react";
import Link from "next/link";
import { receiptFormSchema, type ReceiptFormData } from "@/lib/schemas";
import { calculateItemAmount, calculateTotals, generateId, getCurrentDate, formatCurrency } from "@/lib/utils";
import { DEFAULT_UNITS, DEFAULT_HSN_SAC_CODES, INVOICE_PREFIX, INVOICE_START_NUMBER } from "@/lib/constants";
import { ReceiptData } from "@/types/billing";

export default function CreateReceiptPage() {
  const router = useRouter();
  const [invoiceNumber] = useState(`${INVOICE_PREFIX}${INVOICE_START_NUMBER.toString().padStart(4, '0')}`);

  const form = useForm<ReceiptFormData>({
    resolver: zodResolver(receiptFormSchema),
    defaultValues: {
      buyerInfo: {
        name: "",
        contact: "",
        address: "",
      },
      items: [
        {
          id: generateId(),
          name: "",
          hsnSac: "",
          quantity: 1,
          unit: "Piece",
          pricePerUnit: 0,
          amount: 0,
        },
      ],
      invoiceNumber: invoiceNumber,
      date: getCurrentDate(),
      received: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const watchedItems = form.watch("items");
  const watchedReceived = form.watch("received");

  // Calculate totals whenever items change
  const totals = calculateTotals(watchedItems);
  const balance = totals.total - watchedReceived;

  // Update item amounts when quantity or price changes
  const updateItemAmount = (index: number) => {
    const item = watchedItems[index];
    if (item.quantity > 0 && item.pricePerUnit > 0) {
      const amount = calculateItemAmount(item.quantity, item.pricePerUnit);
      form.setValue(`items.${index}.amount`, amount);
    }
  };

  const addItem = () => {
    append({
      id: generateId(),
      name: "",
      hsnSac: "",
      quantity: 1,
      unit: "Piece",
      pricePerUnit: 0,
      amount: 0,
    });
  };

  const removeItem = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    } else {
      toast.error("At least one item is required");
    }
  };

  const onSubmit = (data: ReceiptFormData) => {
    try {
      // Create receipt data
      const receiptData: ReceiptData = {
        id: generateId(),
        buyerInfo: data.buyerInfo,
        items: data.items.map(item => ({
          ...item,
          amount: calculateItemAmount(item.quantity, item.pricePerUnit),
        })),
        invoiceNumber: data.invoiceNumber,
        date: data.date,
        subTotal: totals.subTotal,
        total: totals.total,
        amountInWords: "", // Will be calculated in the receipt page
        received: data.received,
        balance: balance,
      };

      // Store in localStorage for the receipt page
      localStorage.setItem("currentReceipt", JSON.stringify(receiptData));
      
      toast.success("Receipt created successfully!");
      router.push("/receipt");
    } catch (error) {
      toast.error("Failed to create receipt. Please try again.");
      console.error("Error creating receipt:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Receipt</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to generate your receipt</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Invoice Details
                </CardTitle>
                <CardDescription>Basic information for this receipt</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="invoiceNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Invoice Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="INV0001" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="DD-MM-YYYY" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="received"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount Received (₹)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          {...field} 
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          placeholder="0.00" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Buyer Information */}
            <Card>
              <CardHeader>
                <CardTitle>Buyer Information</CardTitle>
                <CardDescription>Details of the person or company receiving this receipt</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="buyerInfo.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Buyer Name *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter buyer name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="buyerInfo.contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Information *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Phone or email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="buyerInfo.address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Enter buyer address (optional)" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Items & Services</CardTitle>
                    <CardDescription>Add products or services for this receipt</CardDescription>
                  </div>
                  <Button type="button" onClick={addItem} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="border rounded-lg p-4 bg-white">
                      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                        <FormField
                          control={form.control}
                          name={`items.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Item Name *</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="Product or service name" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.hsnSac`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>HSN/SAC</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select code" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {DEFAULT_HSN_SAC_CODES.map((code) => (
                                    <SelectItem key={code} value={code}>
                                      {code}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Quantity *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.01" 
                                  {...field} 
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value) || 0;
                                    field.onChange(value);
                                    updateItemAmount(index);
                                  }}
                                  placeholder="1" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.unit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit *</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {DEFAULT_UNITS.map((unit) => (
                                    <SelectItem key={unit} value={unit}>
                                      {unit}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`items.${index}.pricePerUnit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price/Unit (₹) *</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  step="0.01" 
                                  {...field} 
                                  onChange={(e) => {
                                    const value = parseFloat(e.target.value) || 0;
                                    field.onChange(value);
                                    updateItemAmount(index);
                                  }}
                                  placeholder="0.00" 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <Label>Amount (₹)</Label>
                            <div className="h-10 px-3 py-2 bg-gray-100 rounded-md flex items-center text-sm font-medium">
                              {formatCurrency(watchedItems[index]?.amount || 0)}
                            </div>
                          </div>
                          {fields.length > 1 && (
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeItem(index)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
                <CardDescription>Review the totals before generating your receipt</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sub Total:</span>
                        <span className="font-semibold">{formatCurrency(totals.subTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-semibold text-lg">{formatCurrency(totals.total)}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Received:</span>
                        <span className="font-semibold">{formatCurrency(watchedReceived)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Balance:</span>
                        <span className={`font-semibold ${balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {formatCurrency(balance)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" size="lg" className="px-8">
                <Calculator className="w-5 h-5 mr-2" />
                Generate Receipt
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
