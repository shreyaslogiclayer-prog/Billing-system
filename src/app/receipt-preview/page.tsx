"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Download,
  Share2,
  Receipt,
  Building2,
  User,
  Calendar,
  Phone,
} from "lucide-react";
import Link from "next/link";
import jsPDF from "jspdf";
import { Toaster, toast } from "sonner";

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

export default function ReceiptPreview() {
  const router = useRouter();
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("receiptData");
    if (stored) {
      setReceiptData(JSON.parse(stored));
    } else {
      router.push("/create-receipt");
    }
  }, [router]);

  const calculateTotal = () => {
    if (!receiptData) return 0;
    return receiptData.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  const generatePDF = () => {
    if (!receiptData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let yPosition = 20;

    // Add Unicode font for Rupee symbol
    doc.setFont("helvetica");

    // Header with logo placeholder
    doc.setFillColor(0, 128, 128);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("RECEIPT", pageWidth / 2, yPosition + 5, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(receiptData.businessName, pageWidth / 2, yPosition + 20, {
      align: "center",
    });

    yPosition += 50;

    // Business & Customer Info in two columns
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);

    // Left column - Business Info
    doc.setFont("helvetica", "bold");
    doc.text("From:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(receiptData.businessName, margin, yPosition + 10);
    doc.text(receiptData.businessAddress, margin, yPosition + 15);
    if (receiptData.businessPhone) {
      doc.text(`Phone: ${receiptData.businessPhone}`, margin, yPosition + 20);
    }

    // Right column - Customer Info
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", pageWidth - margin - 80, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(receiptData.buyerName, pageWidth - margin - 80, yPosition + 10);
    doc.text(
      `Date: ${receiptData.date}`,
      pageWidth - margin - 80,
      yPosition + 15
    );

    yPosition += 40;

    // Products Table
    const tableHeaders = ["Item", "Price", "Quantity", "Total"];
    const tableTop = yPosition;
    const columnWidth = contentWidth / 4;

    // Table Header Background
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, yPosition - 5, contentWidth, 10, "F");

    // Table Headers
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    tableHeaders.forEach((header, index) => {
      doc.text(header, margin + columnWidth * index, yPosition);
    });

    yPosition += 10;

    // Table Content
    doc.setFont("helvetica", "normal");
    receiptData.products.forEach((product, index) => {
      const itemTotal = product.price * product.quantity;
      const rowY = yPosition + index * 12;

      // Zebra striping
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(margin, rowY - 5, contentWidth, 12, "F");
      }

      doc.text(product.name.substring(0, 25), margin, rowY);
      doc.text("\u20B9" + product.price.toFixed(2), margin + columnWidth, rowY);
      doc.text(product.quantity.toString(), margin + columnWidth * 2, rowY);
      doc.text("\u20B9" + itemTotal.toFixed(2), margin + columnWidth * 3, rowY);
    });

    yPosition += receiptData.products.length * 12 + 10;

    // Total Section
    doc.setFillColor(0, 128, 128, 0.1);
    doc.rect(margin, yPosition - 5, contentWidth, 15, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    const total = calculateTotal();
    doc.text("Total Amount:", margin + columnWidth * 2, yPosition + 5);
    doc.text(
      "\u20B9" + total.toFixed(2),
      margin + columnWidth * 3,
      yPosition + 5
    );

    // Footer
    yPosition += 30;
    doc.setFillColor(0, 128, 128);
    doc.rect(0, doc.internal.pageSize.height - 20, pageWidth, 20, "F");

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text(
      "Thank you for your business!",
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: "center" }
    );

    // Save PDF
    doc.save(`${receiptData.businessName}-receipt-${receiptData.date}.pdf`);
  };

  const sharePDF = async () => {
    if (!receiptData) return;

    try {
      // Generate PDF with the same formatting as download
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const margin = 15;
      const contentWidth = pageWidth - margin * 2;
      let yPosition = 20;

      // Add Unicode font for Rupee symbol
      doc.setFont("helvetica");

      // Header with logo placeholder
      doc.setFillColor(0, 128, 128);
      doc.rect(0, 0, pageWidth, 40, "F");

      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("RECEIPT", pageWidth / 2, yPosition + 5, { align: "center" });

      doc.setFontSize(14);
      doc.setFont("helvetica", "normal");
      doc.text(receiptData.businessName, pageWidth / 2, yPosition + 20, {
        align: "center",
      });

      yPosition += 50;

      // Business & Customer Info in two columns
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);

      // Left column - Business Info
      doc.setFont("helvetica", "bold");
      doc.text("From:", margin, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(receiptData.businessName, margin, yPosition + 10);
      doc.text(receiptData.businessAddress, margin, yPosition + 15);
      if (receiptData.businessPhone) {
        doc.text(`Phone: ${receiptData.businessPhone}`, margin, yPosition + 20);
      }

      // Right column - Customer Info
      doc.setFont("helvetica", "bold");
      doc.text("Bill To:", pageWidth - margin - 80, yPosition);
      doc.setFont("helvetica", "normal");
      doc.text(receiptData.buyerName, pageWidth - margin - 80, yPosition + 10);
      doc.text(
        `Date: ${receiptData.date}`,
        pageWidth - margin - 80,
        yPosition + 15
      );

      yPosition += 40;

      // Products Table
      const tableHeaders = ["Item", "Price", "Quantity", "Total"];
      const columnWidth = contentWidth / 4;

      // Table Header Background
      doc.setFillColor(240, 240, 240);
      doc.rect(margin, yPosition - 5, contentWidth, 10, "F");

      // Table Headers
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      tableHeaders.forEach((header, index) => {
        doc.text(header, margin + columnWidth * index, yPosition);
      });

      yPosition += 10;

      // Table Content
      doc.setFont("helvetica", "normal");
      receiptData.products.forEach((product, index) => {
        const itemTotal = product.price * product.quantity;
        const rowY = yPosition + index * 12;

        // Zebra striping
        if (index % 2 === 0) {
          doc.setFillColor(250, 250, 250);
          doc.rect(margin, rowY - 5, contentWidth, 12, "F");
        }

        doc.text(product.name.substring(0, 25), margin, rowY);
        doc.text(
          "\u20B9" + product.price.toFixed(2),
          margin + columnWidth,
          rowY
        );
        doc.text(product.quantity.toString(), margin + columnWidth * 2, rowY);
        doc.text(
          "\u20B9" + itemTotal.toFixed(2),
          margin + columnWidth * 3,
          rowY
        );
      });

      yPosition += receiptData.products.length * 12 + 10;

      // Total Section
      doc.setFillColor(0, 128, 128, 0.1);
      doc.rect(margin, yPosition - 5, contentWidth, 15, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      const total = calculateTotal();
      doc.text("Total Amount:", margin + columnWidth * 2, yPosition + 5);
      doc.text(
        "\u20B9" + total.toFixed(2),
        margin + columnWidth * 3,
        yPosition + 5
      );

      // Footer
      yPosition += 30;
      doc.setFillColor(0, 128, 128);
      doc.rect(0, doc.internal.pageSize.height - 20, pageWidth, 20, "F");

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255);
      doc.text(
        "Thank you for your business!",
        pageWidth / 2,
        doc.internal.pageSize.height - 10,
        { align: "center" }
      );

      // Create PDF blob for sharing
      const pdfBlob = doc.output("blob");

      if (navigator.share && navigator.canShare) {
        const file = new File(
          [pdfBlob],
          `${receiptData.businessName}-receipt.pdf`,
          {
            type: "application/pdf",
          }
        );

        const shareData = {
          title: "Receipt",
          text: `Receipt from ${receiptData.businessName}`,
          files: [file],
        };

        // Check if we can share files
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success("Receipt shared successfully!", {
            duration: 3000,
            position: "bottom-center",
          });
        } else {
          // Fallback to sharing just text if file sharing is not supported
          await navigator.share({
            title: "Receipt",
            text: `Receipt from ${
              receiptData.businessName
            }\nTotal: ${"\u20B9"}${calculateTotal().toFixed(2)}\nDate: ${
              receiptData.date
            }`,
          });
          toast.success("Receipt details shared!", {
            duration: 3000,
            position: "bottom-center",
          });
        }
      } else {
        // Fallback for desktop: copy to clipboard
        const text = `Receipt from ${
          receiptData.businessName
        }\nTotal: ${"\u20B9"}${calculateTotal().toFixed(2)}\nDate: ${
          receiptData.date
        }`;
        await navigator.clipboard.writeText(text);
        toast.success("Receipt details copied to clipboard!", {
          duration: 3000,
          position: "bottom-center",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Unable to share receipt. Please try downloading instead.", {
        duration: 3000,
        position: "bottom-center",
      });
    }
  };

  if (!receiptData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading receipt...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-purple-50 py-8 px-4">
      <Toaster richColors expand={true} position="top-right" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/create-receipt"
            className="p-2 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
              Receipt Preview
            </h1>
            <p className="text-gray-600">Review and download your receipt</p>
          </div>
        </div>

        {/* Receipt Preview */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Receipt Header */}
          <div className="bg-gradient-to-r from-teal-500 to-purple-600 p-8 text-white text-center">
            <Receipt className="w-16 h-16 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">RECEIPT</h2>
            <p className="text-teal-100 text-lg">{receiptData.businessName}</p>
          </div>

          {/* Receipt Content */}
          <div className="p-8">
            {/* Business Information */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Business Details
                    </h3>
                    <p className="text-gray-600">{receiptData.businessName}</p>
                    <p className="text-gray-600">
                      {receiptData.businessAddress}
                    </p>
                    {receiptData.businessPhone && (
                      <p className="text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {receiptData.businessPhone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-magenta-100 rounded-xl flex items-center justify-center">
                    <User className="w-5 h-5 text-magenta-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Customer Details
                    </h3>
                    <p className="text-gray-600">{receiptData.buyerName}</p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {receiptData.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Table */}
            <div className="mb-8">
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-800 mb-4">
                  Products & Services
                </h3>
                <div className="space-y-3">
                  {receiptData.products.map((product) => {
                    const itemTotal = product.price * product.quantity;
                    return (
                      <div
                        key={product.id}
                        className="flex justify-between items-center py-3 border-b border-gray-200 last:border-b-0"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            ₹{product.price.toFixed(2)} × {product.quantity}
                          </p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          ₹{itemTotal.toFixed(2)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-teal-50 to-purple-50 rounded-2xl p-6 border border-teal-200 mb-8">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-800">
                  Total Amount
                </span>
                <span className="text-3xl font-bold text-teal-600">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={generatePDF}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </button>

              <button
                onClick={sharePDF}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Share2 className="w-5 h-5" />
                Share PDF
              </button>
            </div>
          </div>
        </div>

        {/* Back to Create */}
        <div className="text-center mt-8">
          <Link
            href="/create-receipt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Create Another Receipt
          </Link>
        </div>
      </div>
    </div>
  );
}
