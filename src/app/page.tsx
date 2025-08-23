import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Calculator, Download } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6">
            <Receipt className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            QuikReceipt
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Create professional receipts and invoices in minutes. 
            Simple, fast, and beautiful billing for your business.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Easy Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Simple forms with real-time calculations and validation
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-xl">Professional Design</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Beautiful, customizable templates that look professional
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Download className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-xl">Export & Share</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Download as PDF or share via email instantly
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-md mx-auto border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-blue-100">
                Create your first professional receipt in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/create-receipt">
                <Button 
                  size="lg" 
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 hover:text-blue-700"
                >
                  <Receipt className="w-5 h-5 mr-2" />
                  Create Receipt
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>© 2024 QuikReceipt. Built with Next.js and shadcn/ui</p>
        </div>
      </div>
    </div>
  );
}
