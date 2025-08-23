# QuikReceipt - Modern Billing System

A modern, client-side billing system built with Next.js and shadcn/ui components. Create professional receipts and invoices with ease, featuring real-time calculations, form validation, and PDF export capabilities.

## ✨ Features

- **Modern UI**: Built with shadcn/ui components for a clean, accessible interface
- **Form Validation**: Robust client-side validation using Zod schemas
- **Real-time Calculations**: Automatic totals and balance calculations
- **Dynamic Product Rows**: Add/remove product items dynamically
- **PDF Export**: Generate professional PDF receipts using html2pdf.js
- **Email Sharing**: Share receipts via email with pre-filled content
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **No Backend Required**: Entirely client-side application

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd billing-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx          # Home page
│   ├── create-receipt/   # Receipt creation form
│   └── receipt/          # Receipt display and PDF generation
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── navigation.tsx    # Navigation component
├── hooks/                 # Custom React hooks
│   └── useReceipt.ts     # Receipt data management
├── lib/                   # Utility functions and configurations
│   ├── constants.ts      # Company info and defaults
│   ├── schemas.ts        # Zod validation schemas
│   ├── utils.ts          # Helper functions
│   └── pdf-generator.ts  # PDF generation utilities
└── types/                 # TypeScript type definitions
    └── billing.ts        # Billing system types
```

## 🎯 Core Features

### 1. Home Page
- Welcoming interface with clear call-to-action
- Feature highlights and benefits
- Navigation to receipt creation

### 2. Receipt Creation
- **Buyer Information**: Name, contact, and address
- **Product Items**: Dynamic rows with name, HSN/SAC, quantity, unit, and price
- **Real-time Calculations**: Automatic totals and balance
- **Form Validation**: Required field validation and number constraints
- **Responsive Layout**: Optimized for all screen sizes

### 3. Receipt Generation
- **Professional Design**: Clean, invoice-style layout
- **PDF Export**: High-quality PDF generation
- **Email Sharing**: Pre-filled email templates
- **Multiple Actions**: Download, share, or create another receipt

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **Form Handling**: React Hook Form with Zod validation
- **PDF Generation**: html2pdf.js
- **Notifications**: Sonner toast notifications
- **Icons**: Lucide React
- **Styling**: Tailwind CSS v4

## 📱 Usage

### Creating a Receipt

1. Navigate to the home page and click "Create Receipt"
2. Fill in invoice details (number, date, amount received)
3. Enter buyer information (name, contact, address)
4. Add product items with quantities and prices
5. Review the summary and click "Generate Receipt"

### Managing Receipts

- **Download PDF**: Click the download button to save as PDF
- **Share via Email**: Use the email button to open your email client
- **Create Another**: Start a new receipt with the "Create Another" button

## 🎨 Customization

### Company Information
Update company details in `src/lib/constants.ts`:
```typescript
export const COMPANY_INFO: CompanyInfo = {
  name: "Your Company Name",
  owner: "Owner Name",
  address: "Company Address",
  phone: "Phone Number",
  email: "email@company.com",
  logo: "Company Logo"
};
```

### Default Values
Modify default units and HSN/SAC codes in the constants file:
```typescript
export const DEFAULT_UNITS = ["Box", "Piece", "Kg", "Liter"];
export const DEFAULT_HSN_SAC_CODES = ["998314", "998315"];
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

Built with ❤️ using Next.js and shadcn/ui
