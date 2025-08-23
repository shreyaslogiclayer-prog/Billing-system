export interface BuyerInfo {
  name: string;
  contact: string;
  address?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  hsnSac?: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  amount: number;
}

export interface ReceiptData {
  id: string;
  buyerInfo: BuyerInfo;
  items: ProductItem[];
  invoiceNumber: string;
  date: string;
  subTotal: number;
  total: number;
  amountInWords: string;
  received: number;
  balance: number;
}

export interface CompanyInfo {
  name: string;
  owner: string;
  address: string;
  phone: string;
  email: string;
  logo?: string;
}
