"use client";

import Link from "next/link";
import { Receipt, Sparkles, Play } from "lucide-react";

export default function Home() {
  const loadDemoData = () => {
    // Use a fixed date to avoid hydration issues
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const dateString = `${year}-${month}-${day}`;

    const demoData = {
      businessName: "TechCorp Solutions",
      businessAddress: "123 Innovation Drive, Silicon Valley, CA 94025",
      businessPhone: "+1 (555) 123-4567",
      buyerName: "John Smith",
      date: dateString,
      products: [
        {
          id: "1",
          name: "Web Development Services",
          price: 1500.0,
          quantity: 1,
        },
        {
          id: "2",
          name: "UI/UX Design",
          price: 800.0,
          quantity: 1,
        },
        {
          id: "3",
          name: "Hosting & Maintenance",
          price: 200.0,
          quantity: 12,
        },
      ],
    };

    localStorage.setItem("receiptData", JSON.stringify(demoData));
    window.location.href = "/receipt-preview";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-teal-500 to-purple-600 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Brand Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-8 text-center transform hover:scale-[1.02] transition-all duration-500 ease-out hover:shadow-2xl hover:bg-white/100">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transition-all duration-500 ease-out group-hover:shadow-xl">
            <Receipt className="w-10 h-10 text-white transition-transform duration-500 ease-out transform group-hover:scale-110" />
          </div>

          {/* Brand Name */}
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent mb-2 transition-all duration-500">
            QuikReceipts
          </h1>
          <p className="text-gray-600 mb-8 font-medium transition-colors duration-500">
            Create receipts in seconds
          </p>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <Link
              href="/create-receipt"
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-teal-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-md hover:shadow-xl transition-all duration-500 ease-out w-full justify-center hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5 transition-transform duration-500 ease-out group-hover:scale-110" />
              Create Receipt
            </Link>

            <button
              onClick={loadDemoData}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-3 rounded-2xl font-semibold shadow-md hover:shadow-xl transition-all duration-500 ease-out w-full justify-center hover:opacity-95 hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 transition-transform duration-500 ease-out group-hover:scale-110" />
              Try Demo
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/80 mt-6 text-sm">
          Instant receipts, zero hassle.
        </p>
      </div>
    </div>
  );
}
