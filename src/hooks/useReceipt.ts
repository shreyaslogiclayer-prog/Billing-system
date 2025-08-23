import { useState, useEffect } from "react";
import { ReceiptData } from "@/types/billing";
import { numberToWords } from "@/lib/utils";

export function useReceipt() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadReceipt();
  }, []);

  const loadReceipt = () => {
    try {
      const storedReceipt = localStorage.getItem("currentReceipt");
      if (storedReceipt) {
        const parsedReceipt = JSON.parse(storedReceipt);
        // Calculate amount in words
        parsedReceipt.amountInWords = numberToWords(parsedReceipt.total);
        setReceiptData(parsedReceipt);
      }
    } catch (error) {
      console.error("Error loading receipt:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearReceipt = () => {
    localStorage.removeItem("currentReceipt");
    setReceiptData(null);
  };

  const saveReceipt = (data: ReceiptData) => {
    try {
      localStorage.setItem("currentReceipt", JSON.stringify(data));
      setReceiptData(data);
      return true;
    } catch (error) {
      console.error("Error saving receipt:", error);
      return false;
    }
  };

  return {
    receiptData,
    isLoading,
    loadReceipt,
    clearReceipt,
    saveReceipt,
  };
}
