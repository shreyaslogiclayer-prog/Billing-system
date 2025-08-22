"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Receipt, Building2, User } from "lucide-react";
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

export default function CreateReceipt() {
  const router = useRouter();
  const [receiptData, setReceiptData] = useState<ReceiptData>(() => {
    // Use a fixed date to avoid hydration issues
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    return {
      businessName: "",
      businessAddress: "",
      businessPhone: "",
      buyerName: "",
      date: dateString,
      products: [{ id: "1", name: "", price: 0, quantity: 1 }]
    };
  });

  const addProduct = () => {
    const newProduct: Product = {
      id: `product-${receiptData.products.length + 1}-${Math.random().toString(36).substr(2, 9)}`,
      name: "",
      price: 0,
      quantity: 1
    };
    setReceiptData(prev => ({
      ...prev,
      products: [...prev.products, newProduct]
    }));
  };

  const removeProduct = (id: string) => {
    if (receiptData.products.length > 1) {
      setReceiptData(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== id)
      }));
    }
  };

  const updateProduct = (id: string, field: keyof Product, value: string | number) => {
    setReceiptData(prev => ({
      ...prev,
      products: prev.products.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const calculateTotal = () => {
    return receiptData.products.reduce((sum, product) => 
      sum + (product.price * product.quantity), 0
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store data in localStorage and navigate to preview
    localStorage.setItem('receiptData', JSON.stringify(receiptData));
    router.push('/receipt-preview');
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

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Business Information */}
          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Business Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Business Name</label>
                <input
                  type="text"
                  value={receiptData.businessName}
                  onChange={(e) => setReceiptData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Your Business Name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  value={receiptData.businessPhone}
                  onChange={(e) => setReceiptData(prev => ({ ...prev, businessPhone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">Business Address</label>
                <input
                  type="text"
                  value={receiptData.businessAddress}
                  onChange={(e) => setReceiptData(prev => ({ ...prev, businessAddress: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
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
              <h2 className="text-xl font-semibold text-gray-800">Customer Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Customer Name</label>
                <input
                  type="text"
                  value={receiptData.buyerName}
                  onChange={(e) => setReceiptData(prev => ({ ...prev, buyerName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  placeholder="Customer's Full Name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={receiptData.date}
                  onChange={(e) => setReceiptData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                  required
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
                <h2 className="text-xl font-semibold text-gray-800">Products & Services</h2>
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
              {receiptData.products.map((product) => (
                <div 
                  key={product.id}
                  className="grid md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 animate-in slide-in-from-bottom-2 duration-300"
                >
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-medium text-gray-700">Product/Service Name</label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateProduct(product.id, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Product or service name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={product.price}
                      onChange={(e) => updateProduct(product.id, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Qty</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        value={product.quantity}
                        onChange={(e) => updateProduct(product.id, 'quantity', parseInt(e.target.value) || 1)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                        placeholder="1"
                        required
                      />
                      
                      {receiptData.products.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 p-4 bg-gradient-to-r from-teal-50 to-purple-50 rounded-2xl border border-teal-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                <span className="text-2xl font-bold text-teal-600">
                  ${calculateTotal().toFixed(2)}
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
