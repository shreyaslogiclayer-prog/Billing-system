# QuikReceipts - Modern Receipt Generator

A sleek and modern Next.js billing/receipt generator built with a focus on beautiful design, smooth user experience, and full client-side functionality.

## ✨ Features

- **🎨 Modern Design**: Beautiful gradient backgrounds, rounded cards, and smooth animations
- **📱 Mobile Responsive**: Optimized for all device sizes with touch-friendly interfaces
- **⚡ Client-Side Only**: No backend required - everything runs in the browser
- **📄 PDF Generation**: Create professional PDF receipts using jsPDF
- **🔄 Dynamic Products**: Add/remove products with real-time total calculation
- **🎯 Business Ready**: Include business information, customer details, and product listings
- **💾 Local Storage**: Data persists between sessions using localStorage
- **📤 Share & Download**: Download PDFs or share via native sharing APIs

## 🎨 Design Theme

- **Primary Colors**: Teal (#00bfae) to Purple (#8e54e9) gradients
- **Accent Colors**: Magenta (#f94f76), Yellow (#f7c873)
- **Typography**: Inter & Nunito fonts for clean, modern readability
- **Animations**: Smooth transitions, hover effects, and loading states

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

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
billing-system/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home page with CTA
│   │   ├── create-receipt/       # Receipt creation form
│   │   │   └── page.tsx
│   │   ├── receipt-preview/      # Receipt preview & PDF generation
│   │   │   └── page.tsx
│   │   ├── layout.tsx            # Root layout with fonts & metadata
│   │   └── globals.css           # Global styles & theme
│   └── components/               # Reusable UI components
├── public/                       # Static assets & PWA files
└── package.json
```

## 🔧 Usage

### 1. Home Page
- Centered card with brand logo and "Create Receipt" button
- Beautiful gradient background (teal to purple)
- Responsive design with hover animations

### 2. Receipt Creation
- **Business Information**: Name, address, phone number
- **Customer Details**: Customer name and date
- **Products & Services**: Dynamic rows for items, prices, and quantities
- Real-time total calculation
- Form validation and required fields

### 3. Receipt Preview
- Professional receipt layout with business branding
- PDF generation using jsPDF
- Download and share functionality
- Option to create another receipt

## 🛠️ Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **jsPDF**: Client-side PDF generation
- **Lucide React**: Beautiful icon library
- **PWA Support**: Progressive Web App capabilities

## 📱 PWA Features

- Installable on mobile and desktop
- Offline support
- App-like experience
- Custom splash screens and icons

## 🎯 Key Components

### Receipt Creation Form
- Dynamic product rows with add/remove functionality
- Real-time calculations
- Form validation
- Responsive grid layout

### PDF Generation
- Professional receipt template
- Business information header
- Product table with totals
- Clean, readable formatting

### UI/UX Features
- Smooth animations and transitions
- Hover effects and micro-interactions
- Loading states and feedback
- Accessibility-focused design

## 🔒 Data Privacy

- **100% Client-Side**: No data sent to external servers
- **Local Storage**: Data persists in browser localStorage
- **No Backend**: Complete privacy and offline functionality

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review the code examples

---

**QuikReceipts** - Create beautiful receipts in seconds! ✨
