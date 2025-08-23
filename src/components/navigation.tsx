import Link from "next/link";
import { Receipt, Home, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <Receipt className="w-8 h-8" />
            <span className="text-xl font-bold">QuikReceipt</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="w-4 h-4 inline mr-2" />
              Home
            </Link>
            <Link href="/create-receipt">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Receipt
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Link href="/create-receipt">
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
