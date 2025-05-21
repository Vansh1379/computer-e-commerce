"use client";

import {
  AlertCircle,
  Download,
  Mail,
  Printer,
  Save,
  Share2,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuildSummary(props) {
  const {
    estimatedWattage,
    totalPrice,
    compatibilityIssues,
    selectedComponentsCount,
  } = props;

  return (
    <div className="w-full rounded-2xl border border-muted bg-white shadow-sm  mt-3">
      {/* Header */}
      <div className="">
        <h4 className="font-semibold text-foreground mt-3 ml-3">
          Build Summary
        </h4>
      </div>

      {/* Info Section */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Estimated Wattage:</span>
          <span className="font-medium">{estimatedWattage}W</span>
        </div>

        <div className="flex justify-between text-lg font-bold">
          <span>Total Price:</span>
          <span>₹{totalPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Compatibility Issues */}
      {compatibilityIssues.length > 0 && (
        <div className="mt-4 p-3 bg-destructive/10 rounded-md border border-destructive/20">
          <h4 className="font-medium flex items-center gap-2 text-destructive mb-2">
            <AlertCircle className="h-4 w-4" />
            Compatibility Issues
          </h4>
          <ul className="list-disc pl-5 text-sm space-y-1">
            {compatibilityIssues.map((issue, index) => (
              <li key={index} className="text-muted-foreground">
                {issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Buttons Section */}
      <div className="flex flex-col gap-4">
        <Button
          className="w-full"
          size="lg"
          disabled={selectedComponentsCount === 0}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add All to Cart
        </Button>

        <div className="grid grid-cols-2 gap-2 w-full">
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Build
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-2 w-full">
          <Button variant="ghost" size="sm">
            <Download className="h-4 w-4" />
            <span className="sr-only">Download</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Mail className="h-4 w-4" />
            <span className="sr-only">Email</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Printer className="h-4 w-4" />
            <span className="sr-only">Print</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
