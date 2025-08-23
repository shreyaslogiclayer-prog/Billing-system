"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Download, Mail, Plus, Receipt as ReceiptIcon } from "lucide-react";
import Link from "next/link";

import { COMPANY_INFO } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { generatePDF, generateReceiptFilename, prepareElementForPDF } from "@/lib/pdf-generator";
import { useReceipt } from "@/hooks/useReceipt";

export default function ReceiptPage() {
  const router = useRouter();
  const { receiptData, isLoading, clearReceipt } = useReceipt();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && !receiptData) {
      toast.error("No receipt data found");
      router.push("/create-receipt");
    }
  }, [isLoading, receiptData, router]);

  const downloadPDF = async () => {
    if (!receiptRef.current || !receiptData) return;

    setIsGeneratingPDF(true);
    try {
      console.log("Step1...");
      const element = prepareElementForPDF(receiptRef.current);
      const filename = generateReceiptFilename(receiptData);
      console.log("Step2...");
      const success = await generatePDF(element, { filename });
      console.log("Step3...");
      if (success) {
        toast.success("PDF downloaded successfully!");
      } else {
        toast.error("Failed to generate PDF. Please try again.");
      }
    } catch (error) {
      toast.error("F");
      console.error("PDF generation error:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const shareViaEmail = () => {
    if (!receiptData) return;

    const subject = `Receipt ${receiptData.invoiceNumber} from ${COMPANY_INFO.name}`;
    const body = `Dear ${receiptData.buyerInfo.name},\n\nPlease find attached the receipt for invoice ${receiptData.invoiceNumber}.\n\nTotal Amount: ${formatCurrency(receiptData.total)}\n\nThank you for your business!\n\nBest regards,\n${COMPANY_INFO.name}`;

    const mailtoLink = `mailto:${receiptData.buyerInfo.contact}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open default email client
    window.open(mailtoLink);
    toast.success("Email client opened. Please attach the PDF manually.");
  };

  const createAnotherReceipt = () => {
    clearReceipt();
    router.push("/create-receipt");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (!receiptData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Receipt Generated</h1>
          <p className="text-gray-600 mt-2">Your receipt is ready! Download, share, or create another one.</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={downloadPDF} 
            disabled={isGeneratingPDF}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
          </Button>
          
          <Button 
            onClick={shareViaEmail} 
            variant="outline"
            className="border-green-600 text-green-600 hover:bg-green-50"
          >
            <Mail className="w-4 h-4 mr-2" />
            Share via Email
          </Button>
          
          <Button 
            onClick={createAnotherReceipt} 
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Another Receipt
          </Button>
        </div>

        {/* Receipt Preview */}
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <div ref={receiptRef} className="bg-white p-8 max-w-4xl mx-auto">
              {/* Receipt Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Invoice</h1>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="bg-black text-white px-4 py-2 rounded-lg font-bold text-lg">
                    {COMPANY_INFO.logo}
                  </div>
                  <div className="text-left">
                    <h2 className="text-xl font-bold text-gray-900">
                      {COMPANY_INFO.name}-{COMPANY_INFO.owner}
                    </h2>
                    <p className="text-gray-600">{COMPANY_INFO.address}</p>
                    <p className="text-gray-600">Phone: {COMPANY_INFO.phone}</p>
                    <p className="text-gray-600">Email: {COMPANY_INFO.email}</p>
                  </div>
                </div>
              </div>

              {/* Billing and Invoice Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Bill To:</h3>
                  <p className="text-gray-700 font-medium">{receiptData.buyerInfo.name}</p>
                  {receiptData.buyerInfo.contact && (
                    <p className="text-gray-600">{receiptData.buyerInfo.contact}</p>
                  )}
                  {receiptData.buyerInfo.address && (
                    <p className="text-gray-600">{receiptData.buyerInfo.address}</p>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Invoice Details:</h3>
                  <p className="text-gray-700">No: {receiptData.invoiceNumber}</p>
                  <p className="text-gray-700">Date: {receiptData.date}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="mb-8">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">#</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Item Name</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">HSN/SAC</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Quantity</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Unit</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Price/Unit (₹)</th>
                      <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Amount(₹)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {receiptData.items.map((item, index) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.hsnSac || "-"}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.quantity}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.unit}</td>
                        <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.pricePerUnit)}</td>
                        <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.amount)}</td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-semibold">
                      <td colSpan={3} className="border border-gray-300 px-4 py-2">Total</td>
                      <td className="border border-gray-300 px-4 py-2">
                        {receiptData.items.reduce((sum, item) => sum + item.quantity, 0)}
                      </td>
                      <td className="border border-gray-300 px-4 py-2"></td>
                      <td className="border border-gray-300 px-4 py-2"></td>
                      <td className="border border-gray-300 px-4 py-2">{formatCurrency(receiptData.total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Sub Total:</span>
                        <span>{formatCurrency(receiptData.subTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold text-lg">{formatCurrency(receiptData.total)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Invoice Amount In Words:</span>
                        <span className="text-sm italic">{receiptData.amountInWords}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-semibold">Received:</span>
                        <span>{formatCurrency(receiptData.received)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Balance:</span>
                        <span className={`font-bold ${receiptData.balance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {formatCurrency(receiptData.balance)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Signature */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Terms And Conditions:</h3>
                  <p className="text-gray-600">Thank you for doing business with us.</p>
                </div>
                <div className="text-right">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    For {COMPANY_INFO.name}-{COMPANY_INFO.owner}:
                  </h3>
                  <div className="border-t-2 border-gray-400 w-32 ml-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Authorized Signatory</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Actions */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Your receipt has been generated successfully. You can now download it as a PDF or share it via email.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              onClick={downloadPDF} 
              disabled={isGeneratingPDF}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Download className="w-5 h-5 mr-2" />
              {isGeneratingPDF ? "Generating PDF..." : "Download PDF"}
            </Button>
            <Button 
              onClick={createAnotherReceipt} 
              variant="outline"
              size="lg"
            >
              <ReceiptIcon className="w-5 h-5 mr-2" />
              Create Another Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
