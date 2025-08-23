import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Number to words conversion for Indian currency
export function numberToWords(num: number): string {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  function convertLessThanOneThousand(n: number): string {
    if (n === 0) return '';

    if (n < 10) return ones[n];
    if (n < 20) return teens[n - 10];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + ones[n % 10] : '');
    if (n < 1000) return ones[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + convertLessThanOneThousand(n % 100) : '');
    
    return '';
  }

  if (num === 0) return 'Zero';
  
  let rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  
  let result = '';
  
  if (rupees > 0) {
    if (rupees >= 10000000) {
      const crores = Math.floor(rupees / 10000000);
      result += convertLessThanOneThousand(crores) + ' Crore ';
      rupees %= 10000000;
    }
    
    if (rupees >= 100000) {
      const lakhs = Math.floor(rupees / 100000);
      result += convertLessThanOneThousand(lakhs) + ' Lakh ';
      rupees %= 100000;
    }
    
    if (rupees >= 1000) {
      const thousands = Math.floor(rupees / 1000);
      result += convertLessThanOneThousand(thousands) + ' Thousand ';
      rupees %= 1000;
    }
    
    if (rupees > 0) {
      result += convertLessThanOneThousand(rupees);
    }
    
    result += ' Rupees';
  }
  
  if (paise > 0) {
    result += ' and ' + convertLessThanOneThousand(paise) + ' Paise';
  }
  
  return result + ' only';
}

// Calculate item amount
export function calculateItemAmount(quantity: number, pricePerUnit: number): number {
  return Math.round((quantity * pricePerUnit) * 100) / 100;
}

// Calculate totals
export function calculateTotals(items: Array<{ quantity: number; pricePerUnit: number }>): {
  subTotal: number;
  total: number;
} {
  const subTotal = items.reduce((sum, item) => {
    return sum + calculateItemAmount(item.quantity, item.pricePerUnit);
  }, 0);
  
  return {
    subTotal: Math.round(subTotal * 100) / 100,
    total: Math.round(subTotal * 100) / 100, // No tax for now, can be extended
  };
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}

// Get current date in DD-MM-YYYY format
export function getCurrentDate(): string {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
}

// Re-export Firebase utilities for easier imports
export * from './firebase';
