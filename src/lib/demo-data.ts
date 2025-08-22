export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ReceiptData {
  businessName: string;
  businessAddress: string;
  businessPhone: string;
  buyerName: string;
  date: string;
  products: Product[];
}

export const demoReceiptData: ReceiptData = {
  businessName: "TechCorp Solutions",
  businessAddress: "123 Innovation Drive, Silicon Valley, CA 94025",
  businessPhone: "+1 (555) 123-4567",
  buyerName: "John Smith",
  date: "", // Will be set dynamically when needed
  products: [
    {
      id: "1",
      name: "Web Development Services",
      price: 1500.00,
      quantity: 1
    },
    {
      id: "2",
      name: "UI/UX Design",
      price: 800.00,
      quantity: 1
    },
    {
      id: "3",
      name: "Hosting & Maintenance",
      price: 200.00,
      quantity: 12
    }
  ]
};

export const getDemoData = (): ReceiptData => {
  // Use a fixed date to avoid hydration issues
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;
  
  return {
    ...demoReceiptData,
    date: dateString
  };
};
